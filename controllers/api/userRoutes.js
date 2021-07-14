const router = require('express').Router();
const { User } = require('../../models');

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




// const router = require('express').Router();
// const { User, Event, Task } = require('../../models');
// const withAuth = require('../../utils/auth');

// // GET /api/users
// router.get('/', (req, res) => {
//   // Access our User model and run .findAll() method
//   User.findAll({
//       attributes: { exclude: ['password'] }
//   })
//     .then(dbUserData => res.json(dbUserData))
//     .catch(err => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

// // GET /api/users/1
// router.get('/:id', (req, res) => {
//   User.findOne({
//       attributes: { exclude: ['password']},
//       where: {
//         id: req.params.id
//       },
//       include: [
//           {
//             model: Event,
//             attributes: ['id', 'name', 'event_date', 'event_address', 'event_owner']
//           },
//           {
//               model: Task,
//               attributes: ['id', 'name', 'event_id', 'volunteer'],
//               include: {
//                 model: Event,
//                 attributes: ['name']
//               }
//           }
//         ]

//   })
//     .then(dbUserData => {
//       if (!dbUserData) {
//         res.status(404).json({ message: 'No user found with this id' });
//         return;
//       }
//       res.json(dbUserData);
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

// // POST /api/users
// router.post('/', (req, res) => {
//   User.create({
//     first_name: req.body.first_name,
//     last_name: req.body.last_name,
//     email: req.body.email,
//     password: req.body.password
//   })
//   .then(dbUserData => {
//     req.session.save(() => {
//       req.session.user_id = dbUserData.id;
//       req.session.first_name = dbUserData.first_name;
//       req.session.logged_in = true;
  
//       res.json(dbUserData);
//     });
//   });
// });

// // LOGIN
// router.post('/login', (req, res) => {
//   User.findOne({
//     where: {
//       email: req.body.email
//     }
//   }).then(dbUserData => {
//     if (!dbUserData) {
//       res.status(400).json({ message: 'Incorrect email or password, please try again!' });
//       return;
//     }

//     const validPassword = dbUserData.checkPassword(req.body.password);

//     if (!validPassword) {
//       res.status(400).json({ message: 'Incorrect email or password. Please try again!' });
//       return;
//     }

//     req.session.save(() => {
//       // declare session variables
//       req.session.user_id = dbUserData.id;
//       req.session.email = dbUserData.email;
//       req.session.logged_in = true;

//       res.json({ user: dbUserData, message: 'You are now logged in!' });
//     });
//   });
// });


// router.post('/logout', (req, res) => {
//   if (req.session.logged_in) {
//     req.session.destroy(() => {
//       res.status(204).end();
//     });
//   }
//   else {
//     res.status(404).end();
//   }
// });

// // PUT /api/users/1
// router.put('/:id', withAuth, (req, res) => {
//   User.update(req.body, {
//       individualHooks: true,
//       where: {
//           id: req.params.id
//     }
//   })
//     .then(dbUserData => {
//       if (!dbUserData[0]) {
//         res.status(404).json({ message: 'No user found with this id' });
//         return;
//       }
//       res.json(dbUserData);
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

// // DELETE /api/users/1
// router.delete('/:id', withAuth, (req, res) => {
//   User.destroy({
//     where: {
//       id: req.params.id
//     }
//   })
//     .then(dbUserData => {
//       if (!dbUserData) {
//         res.status(404).json({ message: 'No user found with this id' });
//         return;
//       }
//       res.json(dbUserData);
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

// module.exports = router;
