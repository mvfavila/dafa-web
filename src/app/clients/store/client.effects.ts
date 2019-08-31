import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { createEffect } from "@ngrx/effects";
import { switchMap, map, withLatestFrom, catchError } from "rxjs/operators";
import { of } from "rxjs";

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
        return this.http.get<{ clients: Client[] }>(clientsUrl.GET_ALL);
      }),
      map(res => {
        const clients = res.clients;
        const result = clients.map(client => {
          return {
            ...client,
            fields: client.fields ? client.fields : []
          };
        });
        return result;
      }),
      map(clients => ClientActions.setClients({ clients }))
    )
  );

  createClient$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ClientActions.addClient),
        switchMap(action => {
          return this.http
            .post(clientsUrl.POST, { client: action.client })
            .pipe(
              map(_ => ClientActions.addClient({ client: action.client })),
              catchError((err: Error) =>
                of(
                  ClientActions.addClientFailure({
                    client: action.client,
                    errorMessage: `Client creation failed`,
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

  updateClient$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ClientActions.updateClient),
        switchMap(action => {
          return this.http.put(clientsUrl.PUT, { client: action.client }).pipe(
            map(_ =>
              ClientActions.updateClient({
                index: action.index,
                client: action.client
              })
            ),
            catchError((err: Error) =>
              of(
                ClientActions.updateClientFailure({
                  client: action.client,
                  errorMessage: `Client update failed`,
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

  storeClients$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ClientActions.storeClients),
        withLatestFrom(this.store.select("client")),
        switchMap(([_, clientsState]) => {
          return this.http.put(clientsUrl.POST, clientsState.clients);
        })
      );
    },
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) {}
}
