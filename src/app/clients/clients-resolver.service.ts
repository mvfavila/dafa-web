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

import { Client } from "../shared/models/client.model";
import * as fromApp from "../store/app.reducer";
import * as ClientActions from "./store/client.actions";

@Injectable({
  providedIn: "root"
})
export class ClientsResolverService implements Resolve<{ clients: Client[] }> {
  constructor(
    private store: Store<fromApp.AppState>,
    private actions$: Actions
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select("client").pipe(
      take(1),
      map(clientsState => {
        return clientsState.clients;
      }),
      switchMap(clients => {
        if (clients.length === 0) {
          this.store.dispatch(ClientActions.fetchClients());
          return this.actions$.pipe(
            ofType(ClientActions.setClients),
            take(1)
          );
        } else {
          return of({ clients });
        }
      })
    );
  }
}
