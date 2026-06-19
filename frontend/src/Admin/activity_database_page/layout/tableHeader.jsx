/**
 * tableHeader.jsx - layout table header for activity database page
 */
import '../css/ActivityDatabase.css';
import fetchActivityData from '../hooks/fetchActivityData';

export default function TableHeader({ setLoading, setActivities, setAllActivities }) {
    return (
        <div className="table-header"> {/*top of table details*/}
            <h3 className="table-title">Activity Records</h3>

            <div className="table-actions">
              <button
                className="refresh-button"
                onClick={() => fetchActivityData(setLoading, setActivities, setAllActivities)}
              >Refresh Data</button>
            </div>
          </div>
    );
}
