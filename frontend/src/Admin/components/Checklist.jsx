import {useState, useEffect, useCallback} from 'react';

const ChecklistCell = ({activity}) => {
    
    const [expanded, setExpanded] = useState(false);

    const checklistItems = [
      { label: 'Review Weekly Schedule', value: activity.ReviewWeeklySchedule },
      { label: 'Check Mailbox', value: activity.CheckMailbox },
      { label: 'View Front Of The House', value: activity.ViewFrontOfTheHouse },
      { label: 'Turn On Main Water', value: activity.TurnOnMainWater },
      { label: 'Bugs Inside/Outside Front Door', value: activity.BugsInsideOutsideFrontDoor },
      { label: 'Ceilings', value: activity.Ceilings },
      { label: 'Floors', value: activity.Floors },
      { label: 'Close Closets', value: activity.CloseClosets },
      { label: 'Turn Toilets On/Off', value: activity.TurnToiletsOnOff },
      { label: 'Garage Ceiling', value: activity.GarageCeiling },
      { label: 'Garage Floor', value: activity.GarageFloor },
      { label: 'Any Garage Fridge', value: activity.AnyGarageFridge },
      { label: 'AC Air Handler Drain Line', value: activity.AcAirHandlerDrainLine },
      { label: 'Turn On/Off Water Heater In Electrical Panel', value: activity.TurnOnOffWaterHeaterInElectricalPanel },
      { label: 'Turn On/Off Ice Machine', value: activity.TurnOnOffIceMachine },
      { label: 'Thermostat Set To 78 For Close 72 For Opening', value: activity.ThermostatSetTo78ForClose72ForOpening },
      { label: 'View Rear Of The House', value: activity.ViewRearOfTheHouse },
    ];


    return (

        <div className="flex flex-col items-start">
                          <button
                            className="text-blue-600 underline text-sm mb-1"
                            onClick={() => setExpanded(!expanded)}
                          >
                            {expanded ? 'Hide Checklist' : 'Show Checklist'}
                          </button>
                          {expanded && (
                            <div className="overflow-x-auto whitespace-nowrap bg-gray-50 p-2 rounded border border-gray-300 max-w-full">
                              {checklistItems.map((items, idx) => (
                                <span
                                  key={idx}
                                  title={items.label}
                                  className="inline-block px-2 py-1 text-sm"
                                >
                                  {items.label}: {items.value ? '✅' : '❌'}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
    );

  };

  export default ChecklistCell;