const router = require('express').Router();
const sequelize = require('../config/connection');
const { Event, User, Task } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
    Event.findAll({
      where: {
        // use the ID from the session
        user_id: req.session.user_id
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
        // serialize data before passing to template
        const events = dbEventData.map(post => post.get({ plain: true }));
        res.render('profile', { posts, loggedIn: true });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });