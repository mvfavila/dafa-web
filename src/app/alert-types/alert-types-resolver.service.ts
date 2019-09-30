import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Store } from "@ngrx/store";
import { Actions, ofType } from "@ngrx/effects";
import { take, map, switchMap } from "rxjs/operators";
import { of } from "rxjs";

import { AlertType } from "../shared/models/alertType.model";
import * as fromApp from "../store/app.reducer";
import * as AlertTypeActions from "./store/alert-type.actions";

@Injectable({
  providedIn: "root"
})
export class AlertTypesResolverService
  implements Resolve<{ alertTypes: AlertType[] }> {
  constructor(
    private store: Store<fromApp.AppState>,
    private actions$: Actions
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select("alertType").pipe(
      take(1),
      map(alertTypesState => {
        return alertTypesState.alertTypes;
      }),
      switchMap(alertTypes => {
        if (alertTypes.length === 0) {
          this.store.dispatch(AlertTypeActions.fetchAlertTypes());
          return this.actions$.pipe(
            ofType(AlertTypeActions.setAlertTypes),
            take(1)
          );
        } else {
          return of({ alertTypes });
        }
      })
    );
  }
}
