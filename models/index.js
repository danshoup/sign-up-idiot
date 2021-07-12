const User = require('./User');
const Event = require('./Event');
const Task = require('./Task');

Task.hasOne(User, {
    foreignKey: 'volunteer',
});

User.belongsTo(Task, {
    foreignKey:'volunteer',
});

Event.hasOne(User, {
    foreignKey: 'id'
});

User.belongsTo(Event, {
    foreignKey: 'id'
});

Event.hasMany(Task, {
    foreignKey: 'event_id',
    onDelete: 'CASCADE'
});

Task.belongsTo(Event, {
    foreignKey: 'event_id'
});

module.exports = { User, Event, Task };