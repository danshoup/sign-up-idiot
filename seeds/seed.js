const sequelize = require('../config/connection');
const { User, Event, Task } = require('../models');

const userData = require('./userData.json');
const eventData = require('./eventData.json');
const taskData = require('./taskData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const events = await Event.bulkCreate(eventData, {
    returning: true,
  });

  const tasks = await Task.bulkCreate(taskData, {
    returning: true,
  });

  // for (const event of eventData) {
  //   await Event.create({
  //     ...event
  //   });
  // };

  // for (const task of taskData) {
  //   await Task.create({
  //     ...task
  //   });
  // };

  process.exit(0);
};

seedDatabase();
