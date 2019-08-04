import { createAction, props } from "@ngrx/store";
import { Field } from "../../shared/models/field.model";

export const addField = createAction(
  "[Field] Add Field",
  props<{ field: Field }>()
);

export const updateField = createAction(
  "[Field] Update Field",
  props<{ index: number; field: Field }>()
);

export const deleteField = createAction(
  "[Field] Delete Field",
  props<{ index: number }>()
);

export const setFields = createAction(
  "[Field] Set Fields",
  props<{ fields: Field[] }>()
);

export const fetchFields = createAction("[Field] Fetch Fields");

export const storeFields = createAction("[Field] Store Fields");
