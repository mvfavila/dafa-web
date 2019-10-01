import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import { map, switchMap } from "rxjs/operators";

import { AlertType } from "../../shared/models/alertType.model";
import * as fromApp from "src/app/store/app.reducer";
import * as AlertTypeActions from "../store/alert-type.actions";

@Component({
  selector: "app-alert-type-detail",
  templateUrl: "./alert-type-detail.component.html",
  styleUrls: ["./alert-type-detail.component.css"]
})
export class AlertTypeDetailComponent implements OnInit, OnDestroy {
  alertType: AlertType;
  selectedId: number;
  alertTypeIdSubscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.alertTypeIdSubscription = this.route.params
      .pipe(
        map(params => {
          return +params.id;
        }),
        switchMap(id => {
          this.selectedId = id;
          return this.store.select("alertType");
        }),
        map(alertTypesState => {
          return alertTypesState.alertTypes.find((_, index) => {
            return index === this.selectedId;
          });
        })
      )
      .subscribe(alertType => {
        this.alertType = alertType;
      });
  }

  onDelete() {
    this.store.dispatch(
      AlertTypeActions.deleteAlertType({ index: this.selectedId })
    );
    this.router.navigate(["/alertTypes"]);
  }

  ngOnDestroy() {
    if (this.alertTypeIdSubscription) {
      this.alertTypeIdSubscription.unsubscribe();
    }
  }
}
