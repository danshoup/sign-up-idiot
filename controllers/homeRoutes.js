const router = require('express').Router();
const { Event, User, Task } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all events and JOIN with user data
    const eventData = await Event.findAll({
      include: [
        {
          model: User,
          attributes: ['first_name', 'last_name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const events = eventData.map((event) => event.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      events, 
      logged_in: req.session.logged_in 
    });

    // res.status(200).json(events);

  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/events', async (req, res) => {
  try {
    // Get all events and JOIN with user data
    const eventData = await Event.findAll({
      include: [
        {
          model: User,
          attributes: ['first_name', 'last_name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const events = eventData.map((event) => event.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('events', { 
      events, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/event/:id', async (req, res) => {
  try {
    const eventData = await Event.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['first_name', 'last_name'],
        },
      ],
    });

    const event = eventData.get({ plain: true });

    res.render('event', {
      ...event,
      logged_in: req.session.logged_in
    });

    // res.status(200).json(event);
    
  } catch (err) {
    res.status(500).json(err);
  }
});

// Task route -- may need to built into eventRoutes

// router.get('/', async (req, res) => {
//   try {
//     // Get all events and JOIN with user data
//     const taskData = await Task.findAll({
//       include: [
//         {
//           model: User,
//           attributes: ['volunteer'],
//         },
//       ],
//     });

//     // Serialize data so the template can read it
//     const tasks = taskData.map((task) => task.get({ plain: true }));

//     // Pass serialized data and session flag into template
//     res.render('homepage', { 
//       tasks, 
//       logged_in: req.session.logged_in 
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.get('/task/:id', async (req, res) => {
//   try {
//     const taskData = await Task.findByPk(req.params.id, {
//       include: [
//         {
//           model: User,
//           attributes: ['volunteer'],
//         },
//       ],
//     });

//     const task = taskData.get({ plain: true });

//     res.render('task', {
//       ...task,
//       logged_in: req.session.logged_in
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// Use withAuth middleware to prevent access to route
router.get('/userProfile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    // const userData = await User.findByPk(req.session.user_id, {
    //   attributes: { exclude: ['password'] },
    //   // include: [{ model: Event }],
    // });

    // Get all of the tasks and events associated with the current user
    console.log(`req.session.id = ${req.session.user_id}`);
    const userData = await User.findAll({
      where: {
          id: req.session.user_id,
      },
      include: [
        {model: Event,
        attributes: [
          'id',
          'event_owner',
          'event_name', 
          'event_start_date', 
          'event_end_date',
          'event_address_line1',
          'event_address_line2',
          'event_address_city',
          'event_address_state',
          'event_address_zip',
         ],
        },
        {
          model: Task,
          attributes: [
            'id',
            'name', 
          ],
          include: [
            {model: Event,
              attributes: [
                'id',
                'event_owner',
                'event_name', 
                'event_start_date', 
                'event_end_date',
                'event_address_line1',
                'event_address_line2',
                'event_address_city',
                'event_address_state',
                'event_address_zip',
              ],
            }
          ]
        }
      ]
    });

    // Serialize data so the template can read it
    // const users = userData.map((task) => task.get({ plain: true }));
    const users = userData[0].get({ plain: true });

    res.render('userProfile', {
      ...users,
      logged_in: true
    });

    // res.status(200).json({...users, logged_in: true});


  } catch (err) {
    res.status(500).json(err);
  }
});





router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/userProfile');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/homepage');
    return;
  }

  res.render('signup');
});

router.get('/task', (req, res) => {
  res.render('task');
});
module.exports = router;
