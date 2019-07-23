import { ActionReducerMap } from "@ngrx/store";

import * as fromAuth from "../auth/store/auth.reducer";
import * as fromClient from "../clients/store/client.reducer";

export interface AppState {
  auth: fromAuth.State;
  client: fromClient.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  client: fromClient.clientReducer
};
