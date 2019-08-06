import { Action, createReducer, on } from "@ngrx/store";

import { Event } from "../../shared/models/event.model";
import * as EventsActions from "../store/event.actions";

export interface State {
  events: Event[];
}
const initialState: State = { events: [] };

export function eventReducer(
  eventState: State | undefined,
  eventAction: Action
) {
  return createReducer(
    initialState,
    on(EventsActions.addEvent, (state, action) => ({
      ...state,
      events: state.events.concat({ ...action.event })
    })),
    on(EventsActions.updateEvent, (state, action) => ({
      ...state,
      events: state.events.map((event, index) =>
        index === action.index ? { ...action.event } : event
      )
    })),
    on(EventsActions.deleteEvent, (state, action) => ({
      ...state,
      events: state.events.filter((event, index) => index !== action.index)
    })),
    on(EventsActions.setEvents, (state, action) => ({
      ...state,
      events: [...action.events]
    }))
  )(eventState, eventAction);
}
