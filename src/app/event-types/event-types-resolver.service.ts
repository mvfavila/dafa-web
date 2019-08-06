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

import { EventType } from "../shared/models/eventType.model";
import * as fromApp from "../store/app.reducer";
import * as EventTypeActions from "./store/event-type.actions";

@Injectable({
  providedIn: "root"
})
export class EventTypesResolverService
  implements Resolve<{ eventTypes: EventType[] }> {
  constructor(
    private store: Store<fromApp.AppState>,
    private actions$: Actions
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select("eventType").pipe(
      take(1),
      map(eventTypesState => {
        return eventTypesState.eventTypes;
      }),
      switchMap(eventTypes => {
        if (eventTypes.length === 0) {
          this.store.dispatch(EventTypeActions.fetchEventTypes());
          return this.actions$.pipe(
            ofType(EventTypeActions.setEventTypes),
            take(1)
          );
        } else {
          return of({ eventTypes });
        }
      })
    );
  }
}
