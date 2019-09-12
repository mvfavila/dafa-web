import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { createEffect } from "@ngrx/effects";
import { switchMap, map, withLatestFrom, catchError } from "rxjs/operators";
import { of } from "rxjs";

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

  createEvent$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(EventActions.addEvent),
        switchMap(action => {
          return this.http.post(eventsUrl.POST, { event: action.event }).pipe(
            map(_ => EventActions.addEvent({ event: action.event })),
            catchError((err: Error) =>
              of(
                EventActions.addEventFailure({
                  event: action.event,
                  errorMessage: `Event creation failed`,
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

  updateEvent$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(EventActions.updateEvent),
        switchMap(action => {
          return this.http.put(eventsUrl.PUT, { event: action.event }).pipe(
            map(_ =>
              EventActions.updateEvent({
                index: action.index,
                event: action.event
              })
            ),
            catchError((err: Error) =>
              of(
                EventActions.updateEventFailure({
                  event: action.event,
                  errorMessage: `Event update failed`,
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
