const User = require('./User');
const Event = require('./Event');
const Task = require('./Task');

User.hasMany(Event, {
    foreignKey: 'event_owner'
});

Event.belongsTo(User, {
    as: 'event_creator',
    foreignKey: 'event_owner',
    onDelete: 'CASCADE'
});

User.hasMany(Task, {
    foreignKey: 'volunteer'
});

Task.belongsTo(User, {
    as: 'task_volunteer', 
    foreignKey: 'volunteer'
});

Event.hasMany(Task, {
    foreignKey: 'event_id',
    constraints: false
});

Task.belongsTo(Event, {
    foreignKey: 'event_id',
    onDelete: 'CASCADE'
});

module.exports = { User, Event, Task };