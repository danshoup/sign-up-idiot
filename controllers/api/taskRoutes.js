const router = require('express').Router();
const { Task } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newTask = await Task.create({
      ...req.body,
      volunteer: req.session.id
    });

    res.status(200).json(newTask);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const newTask = await Task.update({
      volunteer: req.session.user_id
    },
    {where: {
      id: req.params.id
    }
  });
  console.log(`Task = ${req.params.id}, Volunteer = ${req.session.user_id}`);
    res.status(200).json(newTask);
  } catch (err) {
    res.status(400).json(err);
  }
});

// router.get()

// router.put()

router.delete('/:id', withAuth, async (req, res) => {
  try {
    console.log(`Task ID to DELETE is ${req.params.id}`);
    const taskData = await Task.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!taskData) {
      res.status(404).json({ message: 'No Task found with this id!' });
      return;
    }

    res.render('userProfile', { 
      logged_in: true 
    });

    // res.status(200).json(taskData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
