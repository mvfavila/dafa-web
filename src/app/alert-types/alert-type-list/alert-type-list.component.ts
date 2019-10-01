import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { map } from "rxjs/operators";

import { AlertType } from "src/app/shared/models/alertType.model";
import * as fromApp from "../../store/app.reducer";

@Component({
  selector: "app-alert-type-list",
  templateUrl: "./alert-type-list.component.html",
  styleUrls: ["./alert-type-list.component.css"]
})
export class AlertTypeListComponent implements OnInit, OnDestroy {
  alertTypesChangesSubscription: Subscription;
  alertTypes: AlertType[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.alertTypesChangesSubscription = this.store
      .select("alertType")
      .pipe(map(alertTypeState => alertTypeState.alertTypes))
      .subscribe((alertTypes: AlertType[]) => {
        this.alertTypes = alertTypes;
      });
  }

  onNewAlertType() {
    this.router.navigate(["new"], { relativeTo: this.route });
  }

  ngOnDestroy() {
    if (this.alertTypesChangesSubscription) {
      this.alertTypesChangesSubscription.unsubscribe();
    }
  }
}
