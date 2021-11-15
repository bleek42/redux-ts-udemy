import React from 'react';

import '../styles/Calendar.css';

const Calendar: React.FC = (): JSX.Element => {
  return (
    <div className="calendar">
      <div className="calendar-day">
        <div className="calendar-day-label">
          <span>November 13 2021</span>
        </div>
        <div className="calendar-events">
          <div className="calendar-event">
            <div className="calendar-event-info">
              <div className="calendar-event-time">10:00 - 12:00</div>
              <div className="calendar-event-title">Lerning Redux</div>
            </div>
          </div>
          <button className="calendar-delete-button">&times;</button>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
