import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { createEffect } from "@ngrx/effects";
import { switchMap, map, withLatestFrom } from "rxjs/operators";

import * as fromApp from "../../store/app.reducer";
import * as ClientActions from "./client.actions";
import { Client } from "../../shared/models/client.model";
import { clientsUrl } from "../../shared/path";

@Injectable()
export class ClientEffects {
  fetchClients$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientActions.fetchClients),
      switchMap(() => {
        return this.http.get<Client[]>(clientsUrl.GET_ALL);
      }),
      map(clients => {
        return clients.map(client => {
          return {
            ...client,
            fields: client.fields ? client.fields : []
          };
        });
      }),
      map(clients => ClientActions.setClients({ clients }))
    )
  );

  storeClients$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ClientActions.storeClients),
        withLatestFrom(this.store.select("client")),
        switchMap(([_, clientsState]) => {
          return this.http.put(clientsUrl.POST, clientsState.clients);
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
