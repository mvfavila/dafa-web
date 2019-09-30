import { createAction, props } from "@ngrx/store";
import { AlertType } from "../../shared/models/alertType.model";

export const addAlertType = createAction(
  "[AlertType] Add AlertType",
  props<{ alertType: AlertType }>()
);

export const addAlertTypeFailure = createAction(
  "[AlertType] Add AlertType - Failure",
  props<{
    alertType?: AlertType;
    errorMessage: string;
    originalError?: Error;
  }>()
);

export const updateAlertType = createAction(
  "[AlertType] Update AlertType",
  props<{ index: number; alertType: AlertType }>()
);

export const updateAlertTypeFailure = createAction(
  "[AlertType] Update AlertType - Failure",
  props<{
    alertType?: AlertType;
    errorMessage: string;
    originalError?: Error;
  }>()
);

export const deleteAlertType = createAction(
  "[AlertType] Delete AlertType",
  props<{ index: number }>()
);

export const setAlertTypes = createAction(
  "[AlertType] Set AlertTypes",
  props<{ alertTypes: AlertType[] }>()
);

export const fetchAlertTypes = createAction("[AlertType] Fetch AlertTypes");

export const storeAlertTypes = createAction("[AlertType] Store AlertTypes");
