import { Action, createReducer, on } from "@ngrx/store";

import { Field } from "../../shared/models/field.model";
import * as FieldsActions from "../store/field.actions";

export interface State {
  fields: Field[];
}
const initialState: State = { fields: [] };

export function fieldReducer(
  fieldState: State | undefined,
  fieldAction: Action
) {
  return createReducer(
    initialState,
    on(FieldsActions.addField, (state, action) => ({
      ...state,
      fields: state.fields.concat({ ...action.field })
    })),
    on(FieldsActions.updateField, (state, action) => ({
      ...state,
      fields: state.fields.map((field, index) =>
        index === action.index ? { ...action.field } : field
      )
    })),
    on(FieldsActions.deleteField, (state, action) => ({
      ...state,
      fields: state.fields.filter((field, index) => index !== action.index)
    })),
    on(FieldsActions.setFields, (state, action) => ({
      ...state,
      fields: [...action.fields]
    }))
  )(fieldState, fieldAction);
}
