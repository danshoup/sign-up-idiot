const router = require('express').Router();
const { Event, User, Task } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

// get all users
router.get('/', (req, res) => {
  console.log('======================');
  Event.findAll({
      attributes: [
        'id',
        'name',
        'event_date',
        'event_address',
        'event_owner'
      ],
    order: [['created_at', 'DESC']],
    include: [
      // Task model here -- attached user to task
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
      },
    ]
  })
    .then(dbEventData => res.json(dbEventData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
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
      // include the Task model here:
      {
        model: User,
        attributes: ['first_name', 'last_name', 'email']
      },
      {
        model: Comment,
        attributes: ['id', 'name', 'event_id', 'volunteer'],
        include: {
          model: User,
          attributes: ['first_name', 'last_name', 'email']
        }
      }
    ]
  })
    .then(dbEventData => {
      if (!dbEventData) {
        res.status(404).json({ message: 'No event found with this id' });
        return;
      }
      res.json(dbEventData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.Event('/', withAuth, (req, res) => {
  Event.create({
    name: req.body.name,
    event_date: req.body.event_date,
    event_address: req.body.event_address,
    event_owner: req.session.event_owner,
    user_id: req.session.user_id
  })
    .then(dbEventData => res.json(dbEventData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', withAuth, (req, res) => {
  Event.update({
      name: req.body.name,
      event_date: req.body.event_date,
      event_address: req.body.event_address,
      event_owner: req.session.event_owner
    },
    {
      where: {
        id: req.params.id
      }
    })
    .then(dbEventData => {
      if (!dbEventData) {
        res.status(404).json({ message: 'No event found with this id' });
        return;
      }
      res.json(dbEventData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', withAuth, (req, res) => {
  Event.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbEventData => {
      if (!dbEventData) {
        res.status(404).json({ message: 'No event found with this id' });
        return;
      }
      res.json(dbEventData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;

// router.Event('/', withAuth, async (req, res) => {
//   try {
//     const newEvent = await Event.create({
//       ...req.body,
//       user_id: req.session.user_id,
//     });

//     res.status(200).json(newEvent);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// router.delete('/:id', withAuth, async (req, res) => {
//   try {
//     const EventData = await Event.destroy({
//       where: {
//         id: req.params.id,
//         user_id: req.session.user_id,
//       },
//     });

//     if (!EventData) {
//       res.status(404).json({ message: 'No Event found with this id!' });
//       return;
//     }

//     res.status(200).json(EventData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// module.exports = router;
