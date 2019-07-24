import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import { map, switchMap } from "rxjs/operators";

import { Client } from "../../shared/models/client.model";
import * as fromApp from "src/app/store/app.reducer";
import * as ClientActions from "../store/client.actions";

@Component({
  selector: "app-client-detail",
  templateUrl: "./client-detail.component.html",
  styleUrls: ["./client-detail.component.css"]
})
export class ClientDetailComponent implements OnInit, OnDestroy {
  client: Client;
  selectedId: number;
  clientIdSubscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.clientIdSubscription = this.route.params
      .pipe(
        map(params => {
          return +params.id;
        }),
        switchMap(id => {
          this.selectedId = id;
          return this.store.select("client");
        }),
        map(clientsState => {
          return clientsState.clients.find((_, index) => {
            return index === this.selectedId;
          });
        })
      )
      .subscribe(client => {
        this.client = client;
      });
  }

  onDelete() {
    this.store.dispatch(ClientActions.deleteClient({ index: this.selectedId }));
    this.router.navigate(["/clients"]);
  }

  ngOnDestroy() {
    if (this.clientIdSubscription) {
      this.clientIdSubscription.unsubscribe();
    }
  }
}
