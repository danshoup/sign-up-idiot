const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes.js');
const profileRoutes = require('./profileRoutes.js');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/profile', profileRoutes);

router.use((req, res) => {
    res.status(404).end();
  });

module.exports = router;
