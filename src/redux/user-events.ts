import { RootState } from './store';
import { Action, AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';

interface UserEvent {
  id: number;
  title: string;
  startDate: Date | string;
  endDate: Date | string;
}

interface UserEventsState {
  byIds: Record<UserEvent['id'], UserEvent>;
  allIds: UserEvent['id'][];
}

interface LoadRequestAction extends Action<typeof LOAD_REQUEST> {}

const LOAD_REQUEST = 'userEvents/load_request';

interface LoadSuccessAction extends Action<typeof LOAD_SUCCESS> {}

const LOAD_SUCCESS = 'userEvents/load-success';

export const loadUserEvents =
  (): ThunkAction<void, RootState, undefined, LoadRequestAction> =>
  async (dispatch, getState) => {
    dispatch({
      type: LOAD_REQUEST,
    });

    try {
      const response = await fetch('http://localhost:3001/events');
      const events: UserEvent[] = await response.json();
    } catch {
      console.error('error in load request!');
    }
  };

const initialState: UserEventsState = {
  byIds: {},
  allIds: [],
};

const userEventsReducer = (
  state: UserEventsState = initialState,
  action: AnyAction
) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default userEventsReducer;
