import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { createEffect } from "@ngrx/effects";
import { switchMap, map, withLatestFrom, catchError } from "rxjs/operators";
import { of } from "rxjs";

import * as fromApp from "../../store/app.reducer";
import * as AlertTypeActions from "./alert-type.actions";
import { AlertType } from "../../shared/models/alertType.model";
import { alertTypesUrl } from "../../shared/path";

@Injectable()
export class AlertTypeEffects {
  fetchAlertTypes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AlertTypeActions.fetchAlertTypes),
      switchMap(() => {
        return this.http.get<{ alertTypes: AlertType[] }>(
          alertTypesUrl.GET_ALL
        );
      }),
      map(res => {
        const alertTypes = res.alertTypes;
        const result = alertTypes.map(alertType => {
          return {
            ...alertType
          };
        });
        return result;
      }),
      map(alertTypes => AlertTypeActions.setAlertTypes({ alertTypes }))
    )
  );

  createAlertType$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AlertTypeActions.addAlertType),
        switchMap(action => {
          return this.http
            .post(alertTypesUrl.POST, { alertType: action.alertType })
            .pipe(
              map(_ =>
                AlertTypeActions.addAlertType({ alertType: action.alertType })
              ),
              catchError((err: Error) =>
                of(
                  AlertTypeActions.addAlertTypeFailure({
                    alertType: action.alertType,
                    errorMessage: `AlertType creation failed`,
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

  updateAlertType$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AlertTypeActions.updateAlertType),
        switchMap(action => {
          return this.http
            .put(alertTypesUrl.PUT, { alertType: action.alertType })
            .pipe(
              map(_ =>
                AlertTypeActions.updateAlertType({
                  index: action.index,
                  alertType: action.alertType
                })
              ),
              catchError((err: Error) =>
                of(
                  AlertTypeActions.updateAlertTypeFailure({
                    alertType: action.alertType,
                    errorMessage: `AlertType update failed`,
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

  storeAlertTypes$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AlertTypeActions.storeAlertTypes),
        withLatestFrom(this.store.select("alertType")),
        switchMap(([_, alertTypesState]) => {
          return this.http.put(alertTypesUrl.POST, alertTypesState.alertTypes);
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
