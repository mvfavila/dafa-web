import {
  Component,
  OnInit,
  OnDestroy,
  OnChanges,
  DoCheck
} from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { FormGroup, FormControl, FormArray, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Subscription, Observable } from "rxjs";
import { map, tap } from "rxjs/operators";

import { AlertType } from "src/app/shared/models/alertType.model";
import { EventType } from "src/app/shared/models/eventType.model";
import { regexMask } from "src/app/shared/regex";
import * as fromApp from "src/app/store/app.reducer";
import * as EventTypeActions from "../../event-types/store/event-type.actions";
import * as AlertTypeActions from "../../alert-types/store/alert-type.actions";

const SELECT_ALERT_TYPE_INITIAL_INDEX = -1;

@Component({
  selector: "app-event-type-edit",
  templateUrl: "./event-type-edit.component.html",
  styleUrls: ["./event-type-edit.component.css"]
})
export class EventTypeEditComponent implements OnInit, DoCheck, OnDestroy {
  idSubscription: Subscription;
  index: number;
  isEditMode = false;
  eventType: EventType;
  eventTypeForm: FormGroup;
  eventAlertTypes: AlertType[] = [];
  existingAlertTypes: AlertType[] = [];

  private eventTypeStoreSub: Subscription;
  private existingAlertTypeStoreSub: Subscription;

  get selectedAlertType() {
    return this.eventTypeForm.get("selectedAlertType") as FormControl;
  }

  get alertTypeControls() {
    return this.getAlertTypes().controls;
  }

  getAlertTypes() {
    return this.eventTypeForm.get("alertTypes") as FormArray;
  }

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
    this.eventType = EventType.new();
    this.initForm();
  }

  ngDoCheck(): void {
    this.createAlertTypesControls();
  }

  onSubmit() {
    if (this.isEditMode) {
      this.dispatchUpdateEventTypeAction();
    } else {
      this.dispatchAddEventTypeAction();
    }
    this.navigateUp();
  }

  private navigateUp() {
    this.router.navigate(["../"], { relativeTo: this.route });
  }

  private dispatchAddEventTypeAction() {
    const eventType = this.fillEventTypeObject();
    this.addEventType(eventType);
  }

  private addEventType(eventType: EventType) {
    this.store.dispatch(EventTypeActions.addEventType({ eventType }));
  }

  private dispatchUpdateEventTypeAction() {
    this.store.dispatch(
      EventTypeActions.updateEventType({
        index: this.index,
        eventType: this.fillEventTypeObject()
      })
    );
  }

  private fillEventTypeObject(): EventType {
    const newEventType: EventType = { ...this.eventType };
    const eventTypeForm = this.eventTypeForm.value;

    newEventType.name = eventTypeForm.name;
    newEventType.description = eventTypeForm.description;
    newEventType.active = eventTypeForm.active;
    newEventType.alertTypes = eventTypeForm.alertTypes;

    return newEventType;
  }

  onAddAlertType() {
    const selectedAlertTypeIndex = this.eventTypeForm.get("selectedAlertType")
      .value;
    const selectedAlertType = this.existingAlertTypes[selectedAlertTypeIndex];
    this.eventAlertTypes.push(selectedAlertType);
    const alertTypeFormGroup = this.getAlertTypeForm(selectedAlertType);
    this.getAlertTypes().push(alertTypeFormGroup);
    this.resetAlertTypeSelect();
  }

  private getAlertTypeForm(alertType: AlertType): FormGroup {
    return new FormGroup({
      _id: new FormControl(alertType._id),
      name: new FormControl({ value: alertType.name, disabled: true }, [
        Validators.required,
        Validators.pattern(regexMask.TEXT)
      ]),
      numberOfDaysToWarning: new FormControl(
        { value: alertType.numberOfDaysToWarning, disabled: true },
        [Validators.required, Validators.pattern(regexMask.INTEGER)]
      )
    });
  }

  onCancel() {
    this.router.navigate(["../"], { relativeTo: this.route });
  }

  onDeleteAlertType(index: number) {
    this.eventAlertTypes.splice(index, 1);
    this.getAlertTypes().removeAt(index);
  }

  ngOnDestroy() {
    if (this.idSubscription) {
      this.idSubscription.unsubscribe();
    }
    if (this.existingAlertTypeStoreSub) {
      this.existingAlertTypeStoreSub.unsubscribe();
    }
    if (this.eventTypeStoreSub) {
      this.eventTypeStoreSub.unsubscribe();
    }
  }

  private initForm() {
    this.loadAlertTypes();

    this.initEventTypeForm();

    if (this.isEditMode) {
      this.initEditFormAttributes();
    }

    this.instantiateEventTypeForm();
  }

  private initEventTypeForm() {
    this.eventTypeForm = new FormGroup({
      name: new FormControl(this.eventType.name, [
        Validators.required,
        Validators.pattern(regexMask.TEXT)
      ]),
      description: new FormControl(this.eventType.description, [
        Validators.required,
        Validators.pattern(regexMask.TEXT)
      ]),
      alertTypes: new FormArray([], Validators.required),
      selectedAlertType: new FormControl(SELECT_ALERT_TYPE_INITIAL_INDEX),
      active: new FormControl(this.eventType.active, Validators.required)
    });
  }

  get name() {
    return this.eventTypeForm.get("name");
  }

  get description() {
    return this.eventTypeForm.get("description");
  }

  private instantiateEventTypeForm() {
    this.initEventTypeForm();
    this.createAlertTypesControls();
  }

  private initEditFormAttributes() {
    this.eventTypeStoreSub = this.store
      .select("eventType")
      .pipe(
        map(eventTypeState => {
          return eventTypeState.eventTypes.find((_, index) => {
            return index === this.index;
          });
        })
      )
      .subscribe(editedEventType => {
        this.eventType = editedEventType;
        this.eventAlertTypes = this.eventType.alertTypes;
        if (this.eventType && this.eventAlertTypes) {
          this.createAlertTypesControls();
        }
      });
  }

  private resetAlertTypeSelect() {
    (this.eventTypeForm.get("selectedAlertType") as FormControl).setValue(
      SELECT_ALERT_TYPE_INITIAL_INDEX
    );
  }

  private createAlertTypesControls() {
    this.resetAlertTypeControl();
    if (this.existingAlertTypes.length > 0) {
      this.eventAlertTypes.forEach(alertTypeId => {
        const alertType = this.existingAlertTypes.find(
          at => at._id.toString() === alertTypeId._id.toString()
        );
        if (alertType) {
          this.getAlertTypes().push(this.getAlertTypeForm(alertType));
        }
      });
    }
  }

  private resetAlertTypeControl() {
    if (this.eventTypeForm) {
      while (this.getAlertTypes().length > 0) {
        this.getAlertTypes().removeAt(0);
      }
    }
  }

  private loadAlertTypes() {
    this.fetchAlertTypes();
    this.loadAlertTypeStore();
  }

  private fetchAlertTypes() {
    this.store.dispatch(AlertTypeActions.fetchAlertTypes());
  }

  private loadAlertTypeStore() {
    this.existingAlertTypeStoreSub = this.store
      .select("alertType")
      .pipe(
        map(alertTypeState => {
          return alertTypeState.alertTypes.filter(c => {
            return c.active;
          });
        }),
        tap(results => {
          results.sort();
        })
      )
      .subscribe(alertTypes => {
        this.existingAlertTypes = alertTypes;
      });
  }
}
