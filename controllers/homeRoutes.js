const router = require('express').Router();
const sequelize = require('../config/connection');
const { Event, User, Task } = require('../models');
// const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
  console.log(req.session);
  
  Event.findAll({
    attributes: [
      'id',
      'name',
      'event_date',
      'event_address',
      'event_owner'
    ],
    include: [
      {
        model: Task,
        attributes: ['id', 'name', 'event_id', 'volunteer'],
        include: {
          model: User,
          attributes: ['first_name', 'last_name', 'email']
        }
      },
      {
        model: User,
        attributes: ['first_name', 'last_name', 'email']
      }
    ]
  })
    .then(dbEventData => {
      const events = dbEventData.map(post => post.get({ plain: true }));
      res.render('homepage', {
          events,
          loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

router.get('/event/:id', (req, res) => {
  Event.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'name',
      'event_date',
      'event_address',
      'event_owner'
    ],
    include: [
      {
        model: Task,
        attributes: ['id', 'name', 'event_id', 'volunteer'],
        include: {
          model: User,
          attributes: ['first_name', 'last_name', 'email']
        }
      },
      {
        model: User,
        attributes: ['first_name', 'last_name', 'email']
      }
    ]
  })
    .then(dbEventData => {
      if (!dbEventData) {
        res.status(404).json({ message: 'No event found with this id' });
        return;
      }

      // serialize the data
      const event = dbEventData.get({ plain: true });

      // pass data to template
      // single-post Handlebar to handle single Events
      res.render('single-post', {
          event,
          loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;

// The code below is the code before refactoring
  // Keeping this in case we need to pull code 
  // Will/can be deleted once not needed

// router.get('/', async (req, res) => {
//   try {
    // Get all projects and JOIN with user data
    // const eventData = await Event.findAll({
    //   include: [
    //     {
    //       model: User,
    //       attributes: ['first_name', 'last_name', 'email'],
    //     },
    //     {
    //       model: Task,
    //       attributes: ['name']
    //     }
    //   ],
    // });

    // Serialize data so the template can read it
    // const events = eventData.map((event) => event.get({ plain: true }));

    // Pass serialized data and session flag into template
//     res.render('homepage', { 
//       events, 
//       logged_in: req.session.logged_in 
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.get('/event/:id', async (req, res) => {
//   try {
//     const eventData = await Event.findByPk(req.params.id, {
//       include: [
//         {
//           model: User,
//           attributes: ['first_name', 'last_name'],
//         },
//       ],
//     });

//     const event = eventData.get({ plain: true });

//     res.render('event', {
//       ...event,
//       logged_in: req.session.logged_in
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// Use withAuth middleware to prevent access to route
// router.get('/userProfile', withAuth, async (req, res) => {
//   try {
    // Find the logged in user based on the session ID
//     const userData = await User.findByPk(req.session.user_id, {
//       attributes: { exclude: ['password'] },
//       include: [{ model: Event }],
//     });

//     const user = userData.get({ plain: true });

//     res.render('userProfile', {
//       ...user,
//       logged_in: true
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
//   if (req.session.logged_in) {
//     res.redirect('/userProfile');
//     return;
//   }

//   res.render('login');
// });

// module.exports = router;
