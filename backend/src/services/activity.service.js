/**
 * activity.service.js - logic handling of activity related tasks, e.g creation
 */

const Activity = require('../models/Activity.js');

async function createActivity(Community, 
                ClientName, 
                Address, 
                DoorCode, 
                Service, 
                EmployeeName,
                ReviewWeeklySchedule,
                CheckMailbox,
                ViewFrontOfTheHouse,
                TurnOnMainWater,
                BugsInsideOutsideFrontDoor,
                Ceilings,
                Floors, 
                CloseClosets,
                TurnToiletsOnOff,
                GarageCeiling, 
                GarageFloor,
                AnyGarageFridge,
                AcAirHandlerDrainLine,
                TurnOnOffWaterHeaterInElectricalPanel,
                TurnOnOffIceMachine,
                ThermostatSetTo78ForClose72ForOpening,
                ViewRearOfTheHouse){

                return await Activity.create({
                EmployeeName: EmployeeName,
                Community: Community,
                ClientName: ClientName,
                Address: Address,
                DoorCode: DoorCode,
                Service: Service,
                ReviewWeeklySchedule: ReviewWeeklySchedule === true || ReviewWeeklySchedule === 'true',
                CheckMailbox: CheckMailbox === true || CheckMailbox === 'true',
                ViewFrontOfTheHouse: ViewFrontOfTheHouse === true || ViewFrontOfTheHouse === 'true',
                TurnOnMainWater: TurnOnMainWater === true || TurnOnMainWater === 'true',
                BugsInsideOutsideFrontDoor: BugsInsideOutsideFrontDoor === true || BugsInsideOutsideFrontDoor === 'true',
                Ceilings: Ceilings === true || Ceilings === 'true',
                Floors: Floors === true || Floors === 'true',
                CloseClosets: CloseClosets === true || CloseClosets === 'true',
                TurnToiletsOnOff: TurnToiletsOnOff === true || TurnToiletsOnOff === 'true',
                GarageCeiling: GarageCeiling === true || GarageCeiling === 'true',
                GarageFloor: GarageFloor === true || GarageFloor === 'true',
                AnyGarageFridge: AnyGarageFridge === true || AnyGarageFridge === 'true',
                AcAirHandlerDrainLine: AcAirHandlerDrainLine === true || AcAirHandlerDrainLine === 'true',
                TurnOnOffWaterHeaterInElectricalPanel: TurnOnOffWaterHeaterInElectricalPanel === true || TurnOnOffWaterHeaterInElectricalPanel === 'true',
                TurnOnOffIceMachine: TurnOnOffIceMachine === true || TurnOnOffIceMachine === 'true',
                ThermostatSetTo78ForClose72ForOpening: ThermostatSetTo78ForClose72ForOpening === true || ThermostatSetTo78ForClose72ForOpening === 'true',
                ViewRearOfTheHouse: ViewRearOfTheHouse === true || ViewRearOfTheHouse === 'true',
            });
        }

module.exports = {
    createActivity,
}