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

import { Event } from "../shared/models/event.model";
import * as fromApp from "../store/app.reducer";
import * as EventActions from "./store/event.actions";

@Injectable({
  providedIn: "root"
})
export class EventsResolverService implements Resolve<{ events: Event[] }> {
  constructor(
    private store: Store<fromApp.AppState>,
    private actions$: Actions
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select("event").pipe(
      take(1),
      map(eventsState => {
        return eventsState.events;
      }),
      switchMap(events => {
        if (events.length === 0) {
          this.store.dispatch(EventActions.fetchEvents());
          return this.actions$.pipe(
            ofType(EventActions.setEvents),
            take(1)
          );
        } else {
          return of({ events });
        }
      })
    );
  }
}
