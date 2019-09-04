import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { createEffect } from "@ngrx/effects";
import { switchMap, map, withLatestFrom, catchError } from "rxjs/operators";
import { of } from "rxjs";

import * as fromApp from "../../store/app.reducer";
import * as FieldActions from "./field.actions";
import { Field } from "../../shared/models/field.model";
import { fieldsUrl } from "../../shared/path";

@Injectable()
export class FieldEffects {
  fetchFields$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FieldActions.fetchFields),
      switchMap(() => {
        return this.http.get<{ fields: Field[] }>(fieldsUrl.GET_ALL);
      }),
      map(res => {
        const fields = res.fields;
        const result = fields.map(field => {
          return {
            ...field,
            fields: field.events ? field.events : []
          };
        });
        return result;
      }),
      map(fields => FieldActions.setFields({ fields }))
    )
  );

  createField$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(FieldActions.addField),
        switchMap(action => {
          return this.http.post(fieldsUrl.POST, { field: action.field }).pipe(
            map(_ => FieldActions.addField({ field: action.field })),
            catchError((err: Error) =>
              of(
                FieldActions.addFieldFailure({
                  field: action.field,
                  errorMessage: `Field creation failed`,
                  originalError: err
                })
              )
            )
          );
        })
      );
    },
    { dispatch: false }
  );

  updateField$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(FieldActions.updateField),
        switchMap(action => {
          return this.http.put(fieldsUrl.PUT, { field: action.field }).pipe(
            map(_ =>
              FieldActions.updateField({
                index: action.index,
                field: action.field
              })
            ),
            catchError((err: Error) =>
              of(
                FieldActions.updateFieldFailure({
                  field: action.field,
                  errorMessage: `Field update failed`,
                  originalError: err
                })
              )
            )
          );
        })
      );
    },
    { dispatch: false }
  );

  storeFields$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(FieldActions.storeFields),
        withLatestFrom(this.store.select("field")),
        switchMap(([_, fieldsState]) => {
          return this.http.put(fieldsUrl.POST, fieldsState.fields);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) {}
}
