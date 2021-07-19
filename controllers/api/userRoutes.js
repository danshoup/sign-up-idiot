const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/editProfile', async (req, res) => {
  try {
    // Get all events and JOIN with user data
    const userData = await User.findByPk(req.session.user_id, {
        attributes: {
          exclude:['password']
        }
      }
    );

    // Serialize data so the template can read it
    const user = userData.get({ plain: true });
    console.log(`This is the user ${user}`);
    // Pass serialized data and session flag into template
    res.render('editProfile', { 
      ...user, 
      logged_in: true 
    });

    // res.status(200).json(user);

  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/', withAuth, async (req, res) => {
  try {
    const userData = await User.update({
      ...req.body,
    },
    {
      where: {
        id: req.session.user_id
      }
    });

    if (!userData) {
      res.status(404).json({ message: 'No User found with this id!' });
      return;
    }

    const user = userData.get({ plain: true });

    res.status(200).json(req.body);

    // res.render('userProfile', {
    //   // ...req.body,
    //   logged_in: true
    // });

    // res.status(200).json(event);

  } catch (err) {
    res.status(400).json(err);
  }
});


router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });
    
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;