import { createAction, props } from "@ngrx/store";
import { Event } from "../../shared/models/event.model";

export const addEvent = createAction(
  "[Event] Add Event",
  props<{ event: Event }>()
);

export const updateEvent = createAction(
  "[Event] Update Event",
  props<{ index: number; event: Event }>()
);

export const deleteEvent = createAction(
  "[Event] Delete Event",
  props<{ index: number }>()
);

export const setEvents = createAction(
  "[Event] Set Events",
  props<{ events: Event[] }>()
);

export const fetchEvents = createAction("[Event] Fetch Events");

export const storeEvents = createAction("[Event] Store Events");
