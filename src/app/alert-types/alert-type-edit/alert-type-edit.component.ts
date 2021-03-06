import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { map } from "rxjs/operators";

import { AlertType } from "src/app/shared/models/alertType.model";
import { regexMask } from "src/app/shared/regex";
import { messages, TEXT_FIELD_MIN_LENGTH } from "../../shared/validation";
import * as fromApp from "src/app/store/app.reducer";
import * as AlertTypeActions from "../../alert-types/store/alert-type.actions";

@Component({
  selector: "app-alert-type-edit",
  templateUrl: "./alert-type-edit.component.html",
  styleUrls: ["./alert-type-edit.component.css"]
})
export class AlertTypeEditComponent implements OnInit, OnDestroy {
  idSubscription: Subscription;
  index: number;
  isEditMode = false;
  alertType: AlertType;
  alertTypeForm: FormGroup;
  messages = messages;

  private alertTypeStoreSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.idSubscription = this.route.params.subscribe((params: Params) => {
      this.index = +params.id;
      this.isEditMode = params.id != null;
    });
    this.alertType = AlertType.new();
    this.initForm();
  }

  onSubmit() {
    if (this.isEditMode) {
      this.dispatchUpdateAlertTypeAction();
    } else {
      this.dispatchAddAlertTypeAction();
    }
    this.navigateUp();
  }

  private navigateUp() {
    this.router.navigate(["../"], { relativeTo: this.route });
  }

  private dispatchAddAlertTypeAction() {
    const alertType = this.fillAlertTypeObject();
    this.addAlertType(alertType);
  }

  private addAlertType(alertType: AlertType) {
    this.store.dispatch(AlertTypeActions.addAlertType({ alertType }));
  }

  private dispatchUpdateAlertTypeAction() {
    this.store.dispatch(
      AlertTypeActions.updateAlertType({
        index: this.index,
        alertType: this.fillAlertTypeObject()
      })
    );
  }

  private fillAlertTypeObject(): AlertType {
    const newAlertType: AlertType = { ...this.alertType };
    const alertTypeForm = this.alertTypeForm.value;

    newAlertType.name = alertTypeForm.name;
    newAlertType.numberOfDaysToWarning = alertTypeForm.numberOfDaysToWarning;
    newAlertType.active = alertTypeForm.active;

    return newAlertType;
  }

  onCancel() {
    this.router.navigate(["../"], { relativeTo: this.route });
  }

  ngOnDestroy() {
    if (this.idSubscription) {
      this.idSubscription.unsubscribe();
    }
    if (this.alertTypeStoreSub) {
      this.alertTypeStoreSub.unsubscribe();
    }
  }

  private initForm() {
    if (this.isEditMode) {
      this.initEditFormAttributes();
    }
    this.instantiateAlertTypeForm();
  }

  private instantiateAlertTypeForm() {
    this.alertTypeForm = new FormGroup({
      name: new FormControl(this.alertType.name, [
        Validators.required,
        Validators.minLength(TEXT_FIELD_MIN_LENGTH),
        Validators.pattern(regexMask.TEXT)
      ]),
      numberOfDaysToWarning: new FormControl(
        this.alertType.numberOfDaysToWarning,
        [Validators.required, Validators.pattern(regexMask.INTEGER)]
      ),
      active: new FormControl(this.alertType.active, Validators.required)
    });
  }

  get name() {
    return this.alertTypeForm.get("name");
  }

  get numberOfDaysToWarning() {
    return this.alertTypeForm.get("numberOfDaysToWarning");
  }

  private initEditFormAttributes() {
    this.alertTypeStoreSub = this.store
      .select("alertType")
      .pipe(
        map(alertTypeState => {
          return alertTypeState.alertTypes.find((_, index) => {
            return index === this.index;
          });
        })
      )
      .subscribe(editedAlertType => {
        this.alertType = editedAlertType;
      });
  }
}
