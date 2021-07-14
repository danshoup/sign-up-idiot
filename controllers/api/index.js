const router = require('express').Router();

const userRoutes = require('./userRoutes');
const eventRoutes = require('./eventRoutes');
const taskRoutes = require('./taskRoutes');

router.use('/users', userRoutes);
router.use('/events', eventRoutes);
router.use('/tasks', taskRoutes);

module.exports = router;
