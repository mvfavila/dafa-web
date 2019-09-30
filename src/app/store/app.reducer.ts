import { ActionReducerMap } from "@ngrx/store";

import * as fromAuth from "../auth/store/auth.reducer";
import * as fromClient from "../clients/store/client.reducer";
import * as fromField from "../fields/store/field.reducer";
import * as fromEvent from "../events/store/event.reducer";
import * as fromEventType from "../event-types/store/event-type.reducer";
import * as fromAlertType from "../alert-types/store/alert-type.reducer";

export interface AppState {
  auth: fromAuth.State;
  client: fromClient.State;
  field: fromField.State;
  event: fromEvent.State;
  eventType: fromEventType.State;
  alertType: fromAlertType.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  client: fromClient.clientReducer,
  field: fromField.fieldReducer,
  event: fromEvent.eventReducer,
  eventType: fromEventType.eventTypeReducer,
  alertType: fromAlertType.alertTypeReducer
};
