import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { createEffect } from "@ngrx/effects";
import { switchMap, map, withLatestFrom } from "rxjs/operators";

import * as fromApp from "../../store/app.reducer";
import * as EventTypeActions from "./event-type.actions";
import { EventType } from "../../shared/models/eventType.model";
import { eventTypesUrl } from "../../shared/path";

@Injectable()
export class EventTypeEffects {
  fetchEventTypes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventTypeActions.fetchEventTypes),
      switchMap(() => {
        return this.http.get<{ eventTypes: EventType[] }>(
          eventTypesUrl.GET_ALL
        );
      }),
      map(res => {
        const eventTypes = res.eventTypes;
        const result = eventTypes.map(eventType => {
          return {
            ...eventType
          };
        });
        return result;
      }),
      map(eventTypes => EventTypeActions.setEventTypes({ eventTypes }))
    )
  );

  storeEventTypes$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(EventTypeActions.storeEventTypes),
        withLatestFrom(this.store.select("eventType")),
        switchMap(([_, eventTypesState]) => {
          return this.http.put(eventTypesUrl.POST, eventTypesState.eventTypes);
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
