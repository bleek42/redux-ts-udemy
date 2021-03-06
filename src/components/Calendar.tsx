import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { RootState } from '../redux/store';
import {
  loadUserEvents,
  selectUserEventsArray,
  UserEvent,
} from '../redux/user-events';
import { appendZeroes } from '../utils/appendZeroes';

import '../styles/Calendar.css';

const mapState = (state: RootState) => ({
  events: selectUserEventsArray(state),
});

const mapDispatch = {
  loadUserEvents,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props extends PropsFromRedux {}

const createDateKey = (date: Date) => {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDay();
  return `${year}-${appendZeroes(month)}-${appendZeroes(day)}`;
};

const groupEventsByDay = (events: UserEvent[]) => {
  const groups: Record<string, UserEvent[]> = {};

  const addToGroup = (dateKey: string, event: UserEvent) => {
    if (groups[dateKey] === undefined) {
      groups[dateKey] = [];
    }

    groups[dateKey].push(event);
  };

  events.forEach((event) => {
    const dateStartKey = createDateKey(new Date(event.startDate));
    const dateEndKey = createDateKey(new Date(event.endDate));

    addToGroup(dateStartKey, event);

    if (dateEndKey !== dateStartKey) {
      addToGroup(dateEndKey, event);
    }
  });
  return groups;
};

const Calendar: React.FC<Props> = ({ events, loadUserEvents }): JSX.Element => {
  useEffect(() => {
    loadUserEvents();
  }, []);

  console.log(events);

  let groupedEvents: ReturnType<typeof groupEventsByDay> | undefined;
  let sortedGroupKeys: string[] | undefined;

  if (events.length) {
    groupedEvents = groupEventsByDay(events);
    sortedGroupKeys = Object.keys(groupedEvents).sort(
      (a, b) => +new Date(a) - +new Date(b)
    );
  }

  return groupedEvents && sortedGroupKeys ? (
    <div className="calendar">
      {sortedGroupKeys.map((dayKey) => {
        const events = groupedEvents ? groupedEvents[dayKey] : [];
        const groupDate = new Date(dayKey);
        const day = groupDate.getDate();
        const month = groupDate.toLocaleString(undefined, { month: 'long' });
        return (
          <div className="calendar-day">
            <div className="calendar-day-label">
              <span>
                {month} {day}{' '}
              </span>
            </div>
            <div className="calendar-events">
              {events.map((event) => {
                return (
                  <div key={event.id} className="calendar-event">
                    <div className="calendar-event-info">
                      <div className="calendar-event-time">10:00 - 12:00</div>
                      <div className="calendar-event-title">{event.title}</div>
                    </div>
                    <button className="calendar-delete-button">&times;</button>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default connector(Calendar);
