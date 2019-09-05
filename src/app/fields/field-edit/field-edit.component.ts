import { Component, OnInit, OnDestroy, DoCheck } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { FormGroup, FormControl, FormArray, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { map, tap } from "rxjs/operators";

import { Event } from "../../shared/models/event.model";
import { Client } from "src/app/shared/models/client.model";
import { Field } from "src/app/shared/models/field.model";
import { EventType } from "src/app/shared/models/eventType.model";
import { regexMask } from "src/app/shared/regex";
import { states } from "../../shared/states";
import * as fromApp from "src/app/store/app.reducer";
import * as ClientActions from "../../clients/store/client.actions";
import * as FieldActions from "../../fields/store/field.actions";
import * as EventTypeActions from "../../event-types/store/event-type.actions";

const SELECT_FIELDS_INITIAL_INDEX = -1;

@Component({
  selector: "app-field-edit",
  templateUrl: "./field-edit.component.html",
  styleUrls: ["./field-edit.component.css"]
})
export class FieldEditComponent implements OnInit, DoCheck, OnDestroy {
  idSubscription: Subscription;
  index: number;
  isEditMode = false;
  field: Field;
  fieldForm: FormGroup;
  clients: Client[] = [];
  clientIndex: number;
  events: Event[] = [];
  eventTypes: EventType[] = [];
  states = states;
  stateIndex: number;

  private fieldStoreSub: Subscription;
  private clientStoreSub: Subscription;
  private eventTypeStoreSub: Subscription;

  get eventsControls() {
    return this.getEvents().controls;
  }

  getEvents() {
    return this.fieldForm.get("events") as FormArray;
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
    this.field = Field.new();
    this.initForm();
  }

  ngDoCheck(): void {
    // TODO: there may be a better way to do this.
    // this is necessary for a page refresh when in edit mode
    if (this.isEditMode && this.clients.length > 0) {
      this.clientIndex = this.getClientIndex(this.field);
      this.fieldForm.controls.clientIndex.setValue(this.clientIndex);
    }
  }

  onSubmit() {
    if (this.isEditMode) {
      this.dispatchUpdateFieldAction();
    } else {
      this.dispatchAddFieldAction();
    }
    this.navigateUp();
  }

  private navigateUp() {
    this.router.navigate(["../"], { relativeTo: this.route });
  }

  private dispatchAddFieldAction() {
    this.store.dispatch(
      FieldActions.addField({ field: this.fillFieldObject() })
    );
  }

  private dispatchUpdateFieldAction() {
    this.store.dispatch(
      FieldActions.updateField({
        index: this.index,
        field: this.fillFieldObject()
      })
    );
  }

  private fillFieldObject(): Field {
    const newField: Field = { ...this.field };
    const fieldForm = this.fieldForm.value;

    newField.name = fieldForm.name;
    newField.description = fieldForm.description;
    newField.email = fieldForm.email;
    newField.address = fieldForm.address;
    newField.city = fieldForm.city;
    newField.state = this.states.getStateByIndex(fieldForm.stateIndex).name;
    newField.postalCode = fieldForm.postalCode;
    newField.client = this.getClientByIndex(fieldForm.client)._id;
    newField.active = fieldForm.active;
    newField.events = fieldForm.events;

    return newField;
  }

  private getClientByIndex(clientIndex: number) {
    return this.clients[clientIndex];
  }

  onAddEvent() {
    if (this.eventTypes && this.eventTypes.length === 0) {
      this.loadEventTypes();
    }
    this.getEvents().push(
      new FormGroup({
        eventType: new FormControl(-1, Validators.required),
        date: new FormControl(Date.now(), [
          Validators.required
          // Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  onCancel() {
    this.router.navigate(["../"], { relativeTo: this.route });
  }

  onDeleteEvent(index: number) {
    this.getEvents().removeAt(index);
  }

  ngOnDestroy() {
    if (this.idSubscription) {
      this.idSubscription.unsubscribe();
    }
    if (this.fieldStoreSub) {
      this.fieldStoreSub.unsubscribe();
    }
    if (this.clientStoreSub) {
      this.clientStoreSub.unsubscribe();
    }
    if (this.eventTypeStoreSub) {
      this.eventTypeStoreSub.unsubscribe();
    }
  }

  private createEventsControls(events: Event[]): FormControl[] {
    const eventsControls = [];
    events.forEach(event => {
      eventsControls.push(
        new FormGroup({
          eventTypeName: new FormControl(
            event.eventType ? event.eventType.name : null,
            Validators.required
          ),
          date: new FormControl(event.date, Validators.required),
          active: new FormControl(event.active, [
            Validators.required
            // Validators.pattern(/^[1-9]+[0-9]*$/)
          ])
        })
      );
    });
    return eventsControls;
  }

  private initForm() {
    this.loadClients();
    this.setFormDefaultValues();

    if (this.isEditMode) {
      this.initEditFormAttributes();
    }

    this.instantiateFieldForm();
  }

  private setFormDefaultValues() {
    this.stateIndex = SELECT_FIELDS_INITIAL_INDEX;
    this.clientIndex = SELECT_FIELDS_INITIAL_INDEX;
  }

  private instantiateFieldForm() {
    this.fieldForm = new FormGroup({
      name: new FormControl(this.field.name, [
        Validators.required,
        Validators.pattern(regexMask.TEXT)
      ]),
      description: new FormControl(this.field.description),
      email: new FormControl(
        this.field.email,
        Validators.pattern(regexMask.EMAIL)
      ),
      address: new FormControl(
        this.field.address,
        Validators.pattern(regexMask.TEXT)
      ),
      city: new FormControl(
        this.field.city,
        Validators.pattern(regexMask.TEXT)
      ),
      stateIndex: new FormControl(this.stateIndex),
      postalCode: new FormControl(
        this.field.postalCode,
        Validators.pattern(regexMask.POSTAL_CODE)
      ),
      events: new FormArray(this.createEventsControls(this.field.events)),
      clientIndex: new FormControl(this.clientIndex, Validators.required),
      active: new FormControl(this.field.active, Validators.required)
    });
  }

  private initEditFormAttributes() {
    this.fieldStoreSub = this.store
      .select("field")
      .pipe(
        map(fieldState => {
          return fieldState.fields.find((_, index) => {
            return index === this.index;
          });
        })
      )
      .subscribe(editedField => {
        this.field = editedField;
        this.clientIndex = this.getClientIndex(editedField);
        this.stateIndex = states.getStateIndex(this.field.state);
      });
    if (this.field.events.length > 0) {
      this.loadEventTypes();
    }
  }

  private getClientIndex(editedField: Field): number {
    return this.clients
      .map(c => c._id.toString())
      .indexOf(editedField.client.toString());
  }

  private loadClients() {
    this.fetchClients();
    this.loadClientsStore();
  }

  private fetchClients() {
    this.store.dispatch(ClientActions.fetchClients());
  }

  private loadClientsStore() {
    this.clientStoreSub = this.store
      .select("client")
      .pipe(
        map(clientState => {
          return clientState.clients.filter(c => {
            return c.active;
          });
        }),
        tap(results => {
          results.sort();
        })
      )
      .subscribe(activeClients => {
        this.clients = activeClients;
      });
  }

  private loadEventTypes() {
    this.store.dispatch(EventTypeActions.fetchEventTypes());
    this.eventTypeStoreSub = this.store
      .select("eventType")
      .pipe(
        map(eventTypeState => {
          return eventTypeState.eventTypes.filter(c => {
            return c.active;
          });
        }),
        tap(results => {
          results.sort();
        })
      )
      .subscribe(activeEventTypes => {
        this.eventTypes = activeEventTypes;
      });
  }
}
