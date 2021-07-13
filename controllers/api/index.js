const router = require('express').Router();

const userRoutes = require('./userRoutes');
const eventRoutes = require('./eventRoutes');
const taskRoutes = require('./taskRoutes');

router.use('/users', userRoutes);
router.use('/posts', eventRoutes);
router.use('/comments', taskRoutes);

module.exports = router;
