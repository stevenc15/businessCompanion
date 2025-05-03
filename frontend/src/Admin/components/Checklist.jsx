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
      <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '500px' }}>
        <button
          style={{ color: '#2563eb', textDecoration: 'underline', fontSize: '14px', marginBottom: '8px', textAlign: 'left', background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? 'Hide Checklist' : 'Show Checklist'}
        </button>
  
        {expanded && (
          <div style={{ backgroundColor: '#f9fafb', padding: '16px', borderRadius: '6px', border: '1px solid #d1d5db' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: '16px', rowGap: '8px', fontSize: '14px' }}>
              {checklistItems.map((item, idx) => (
                <div key={idx} title={item.label} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '180px' }}>
                    {item.label}
                  </span>
                  <span>{item.value ? '✅' : '❌'}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );

  };

  export default ChecklistCell;