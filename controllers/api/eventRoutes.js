const router = require('express').Router();
const { Event } = require('../../models');
// const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

router.get('/:id', withAuth, async (req, res) => {
  try {
    const eventData = await Event.findByPk(req.params.id, {});

    const event = eventData.get({ plain: true });

    res.render('editEvent', {
      ...event,
      logged_in: true
    });

    // res.status(200).json(event);
    
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', withAuth, async (req, res) => {
  try {
    const newEvent = await Event.create({
      ...req.body,
      event_owner: req.session.user_id,
    });

    res.status(200).json(newEvent);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const eventData = await Event.update({
      ...req.body,
      event_owner: req.session.user_id
    },
    {
      where: {
        id: req.params.id
      }
    });

    if (!eventData) {
      res.status(404).json({ message: 'No Event found with this id!' });
      return;
    }

    res.status(200).json(eventData);

  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const eventData = await Event.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!eventData) {
      res.status(404).json({ message: 'No Event found with this id!' });
      return;
    }

    res.status(200).json(eventData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;


