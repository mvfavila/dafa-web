import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { createEffect } from "@ngrx/effects";
import { switchMap, map, catchError } from "rxjs/operators";
import { of } from "rxjs";

import * as fromApp from "../../store/app.reducer";
import * as ClientActions from "./client.actions";
import { Client } from "../../shared/models/client.model";
import { clientsUrl } from "../../shared/path";

function treatMessage(responseErrorMessage: string, originalMessage: string) {
  switch (responseErrorMessage) {
    case "FIRST_NAME_NOT_FOUND":
      originalMessage = "First Name is required.";
      break;
    case "LAST_NAME_NOT_FOUND":
      originalMessage = "Last Name is required.";
      break;
    case "EMAIL_NOT_FOUND":
      originalMessage = "E-mail is required.";
      break;
  }
  return originalMessage;
}

const handleCreateClientError = (errorRes, client: Client) => {
  let errorMessage = "Client creation failed";

  if (!errorRes.error || !errorRes.error.error) {
    return of(ClientActions.addClientFailure({ client, errorMessage }));
  }

  errorMessage = treatMessage(errorRes.error.error.message, errorMessage);

  return of(
    ClientActions.addClientFailure({
      client,
      errorMessage,
      originalError: errorRes.error.error
    })
  );
};

const handleUpdateClientError = (errorRes, client: Client) => {
  let errorMessage = "Client update failed";

  if (!errorRes.error || !errorRes.error.error) {
    return of(ClientActions.updateClientFailure({ client, errorMessage }));
  }

  errorMessage = treatMessage(errorRes.error.error.message, errorMessage);

  return of(
    ClientActions.updateClientFailure({
      client,
      errorMessage,
      originalError: errorRes.error.error
    })
  );
};

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
      map(clients => ClientActions.setClients({ clients })),
      catchError((err: Error) =>
        of(
          ClientActions.fetchClientsFailure({
            errorMessage: `Clients fetch failed`,
            originalError: err
          })
        )
      )
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
                handleCreateClientError(err, action.client)
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
              handleUpdateClientError(err, action.client)
            )
          );
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
