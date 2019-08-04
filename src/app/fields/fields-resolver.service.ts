import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Store } from "@ngrx/store";
import { Actions, ofType } from "@ngrx/effects";
import { take, map, switchMap, tap } from "rxjs/operators";
import { of } from "rxjs";

import { Field } from "../shared/models/field.model";
import * as fromApp from "../store/app.reducer";
import * as FieldActions from "./store/field.actions";

@Injectable({
  providedIn: "root"
})
export class FieldsResolverService implements Resolve<{ fields: Field[] }> {
  constructor(
    private store: Store<fromApp.AppState>,
    private actions$: Actions
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select("field").pipe(
      take(1),
      map(fieldsState => {
        return fieldsState.fields;
      }),
      switchMap(fields => {
        if (fields.length === 0) {
          this.store.dispatch(FieldActions.fetchFields());
          return this.actions$.pipe(
            ofType(FieldActions.setFields),
            take(1)
          );
        } else {
          return of({ fields });
        }
      })
    );
  }
}
