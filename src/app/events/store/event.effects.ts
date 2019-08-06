import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { createEffect } from "@ngrx/effects";
import { switchMap, map, withLatestFrom } from "rxjs/operators";

import * as fromApp from "../../store/app.reducer";
import * as EventActions from "./event.actions";
import { Event } from "../../shared/models/event.model";
import { eventsUrl } from "../../shared/path";

@Injectable()
export class EventEffects {
  fetchEvents$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventActions.fetchEvents),
      switchMap(() => {
        return this.http.get<{ events: Event[] }>(eventsUrl.GET_ALL);
      }),
      map(res => {
        const events = res.events;
        const result = events.map(event => {
          return {
            ...event
          };
        });
        return result;
      }),
      map(events => EventActions.setEvents({ events }))
    )
  );

  storeEvents$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(EventActions.storeEvents),
        withLatestFrom(this.store.select("event")),
        switchMap(([_, eventsState]) => {
          return this.http.put(eventsUrl.POST, eventsState.events);
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
