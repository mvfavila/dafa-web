import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { createEffect } from "@ngrx/effects";
import { switchMap, map, withLatestFrom } from "rxjs/operators";

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
