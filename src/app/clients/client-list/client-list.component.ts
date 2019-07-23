import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { map } from "rxjs/operators";

import { Client } from "src/app/shared/models/client.model";
import * as fromApp from "../../store/app.reducer";

@Component({
  selector: "app-client-list",
  templateUrl: "./client-list.component.html",
  styleUrls: ["./client-list.component.css"]
})
export class ClientListComponent implements OnInit, OnDestroy {
  clientsChangesSubscription: Subscription;
  clients: Client[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.clientsChangesSubscription = this.store
      .select("client")
      .pipe(map(clientState => clientState.clients))
      .subscribe((clients: Client[]) => {
        this.clients = clients;
      });
  }

  onNewClient() {
    this.router.navigate(["new"], { relativeTo: this.route });
  }

  ngOnDestroy() {
    if (this.clientsChangesSubscription) {
      this.clientsChangesSubscription.unsubscribe();
    }
  }
}
