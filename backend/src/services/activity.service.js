/**
 * activity.service.js - logic handling of activity related tasks, e.g creation
 */

const Activity = require('../models/Activity.js');

const BOOLEAN_FIELDS = [
    'ReviewWeeklySchedule',
    'CheckMailbox',
    'ViewFrontOfTheHouse',
    'TurnOnMainWater',
    'BugsInsideOutsideFrontDoor',
    'Ceilings',
    'Floors',
    'CloseClosets',
    'TurnToiletsOnOff',
    'GarageCeiling',
    'GarageFloor',
    'AnyGarageFridge',
    'AcAirHandlerDrainLine',
    'TurnOnOffWaterHeaterInElectricalPanel',
    'TurnOnOffIceMachine',
    'ThermostatSetTo78ForClose72ForOpening',
    'ViewRearOfTheHouse',
];

const STRING_FIELDS = ['EmployeeName', 'Community', 'ClientName', 'Address', 'Service'];

function toBool(value) {
    return value === true || value === 'true';
}

async function createActivity(data) {
    const activityData = {};

    STRING_FIELDS.forEach(field => {
        activityData[field] = data[field];
    });

    BOOLEAN_FIELDS.forEach(field => {
        activityData[field] = toBool(data[field]);
    });

    return Activity.create(activityData);
}

async function getAllActivities() {
    return Activity.findAll();
}

async function getOneActivity(ActivityId) {
    return Activity.findOne({ where: { ActivityId } });
}

async function editActivity(activity, updates) {
    STRING_FIELDS.forEach(field => {
        if (updates[field] !== undefined) activity[field] = updates[field];
    });

    BOOLEAN_FIELDS.forEach(field => {
        if (updates[field] !== undefined) activity[field] = toBool(updates[field]);
    });

    await activity.save();

    return activity;
}

async function deleteActivity(activity) {
    await activity.destroy();
}

async function toggleActivityStatus(activity) {
    activity.Status = !activity.Status;
    await activity.save();

    return activity;
}

module.exports = {
    createActivity,
    getAllActivities,
    getOneActivity,
    editActivity,
    deleteActivity,
    toggleActivityStatus,
}
