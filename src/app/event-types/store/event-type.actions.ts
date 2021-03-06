import { createAction, props } from "@ngrx/store";
import { EventType } from "../../shared/models/eventType.model";

export const addEventType = createAction(
  "[EventType] Add EventType",
  props<{ eventType: EventType }>()
);

export const addEventTypeFailure = createAction(
  "[EventType] Add EventType - Failure",
  props<{
    eventType?: EventType;
    errorMessage: string;
    originalError?: Error;
  }>()
);

export const updateEventType = createAction(
  "[EventType] Update EventType",
  props<{ index: number; eventType: EventType }>()
);

export const updateEventTypeFailure = createAction(
  "[EventType] Update EventType - Failure",
  props<{
    eventType?: EventType;
    errorMessage: string;
    originalError?: Error;
  }>()
);

export const deleteEventType = createAction(
  "[EventType] Delete EventType",
  props<{ index: number }>()
);

export const setEventTypes = createAction(
  "[EventType] Set EventTypes",
  props<{ eventTypes: EventType[] }>()
);

export const fetchEventTypes = createAction("[EventType] Fetch EventTypes");

export const storeEventTypes = createAction("[EventType] Store EventTypes");
