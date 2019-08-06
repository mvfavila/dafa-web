import { Action, createReducer, on } from "@ngrx/store";

import { EventType } from "../../shared/models/eventType.model";
import * as EventTypesActions from "../store/event-type.actions";

export interface State {
  eventTypes: EventType[];
}
const initialState: State = { eventTypes: [] };

export function eventTypeReducer(
  eventTypeState: State | undefined,
  eventTypeAction: Action
) {
  return createReducer(
    initialState,
    on(EventTypesActions.addEventType, (state, action) => ({
      ...state,
      eventTypes: state.eventTypes.concat({ ...action.eventType })
    })),
    on(EventTypesActions.updateEventType, (state, action) => ({
      ...state,
      eventTypes: state.eventTypes.map((eventType, index) =>
        index === action.index ? { ...action.eventType } : eventType
      )
    })),
    on(EventTypesActions.deleteEventType, (state, action) => ({
      ...state,
      eventTypes: state.eventTypes.filter(
        (eventType, index) => index !== action.index
      )
    })),
    on(EventTypesActions.setEventTypes, (state, action) => ({
      ...state,
      eventTypes: [...action.eventTypes]
    }))
  )(eventTypeState, eventTypeAction);
}
