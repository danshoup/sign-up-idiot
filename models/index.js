const User = require('./User');
const Event = require('./Event');
const Task = require('./Task');

User.hasMany(Event, {
    foreignKey: 'event_owner'
});

User.hasMany(Task, {
    foreignKey: 'volunteer'
});

Event.hasMany(Task, {
    foreignKey: 'event_id',
    constraints: false
});

Event.belongsTo(User, {
    foreignKey: 'event_owner',
    onDelete: 'CASCADE'
});

Task.belongsTo(Event, {
    foreignKey: 'event_id',
    onDelete: 'CASCADE'
});

module.exports = { User, Event, Task };