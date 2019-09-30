import { Action, createReducer, on } from "@ngrx/store";

import { AlertType } from "../../shared/models/alertType.model";
import * as AlertTypesActions from "../store/alert-type.actions";

export interface State {
  alertTypes: AlertType[];
}
const initialState: State = { alertTypes: [] };

export function alertTypeReducer(
  alertTypeState: State | undefined,
  alertTypeAction: Action
) {
  return createReducer(
    initialState,
    on(AlertTypesActions.addAlertType, (state, action) => ({
      ...state,
      alertTypes: state.alertTypes.concat({ ...action.alertType })
    })),
    on(AlertTypesActions.updateAlertType, (state, action) => ({
      ...state,
      alertTypes: state.alertTypes.map((alertType, index) =>
        index === action.index ? { ...action.alertType } : alertType
      )
    })),
    on(AlertTypesActions.deleteAlertType, (state, action) => ({
      ...state,
      alertTypes: state.alertTypes.filter(
        (alertType, index) => index !== action.index
      )
    })),
    on(AlertTypesActions.setAlertTypes, (state, action) => ({
      ...state,
      alertTypes: [...action.alertTypes]
    }))
  )(alertTypeState, alertTypeAction);
}
