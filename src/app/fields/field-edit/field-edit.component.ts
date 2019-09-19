import { Component, OnInit, OnDestroy, DoCheck } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { FormGroup, FormControl, FormArray, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Subscription, Observable } from "rxjs";
import { map, tap } from "rxjs/operators";

import { Event } from "../../shared/models/event.model";
import { Client } from "src/app/shared/models/client.model";
import { Field } from "src/app/shared/models/field.model";
import { EventType } from "src/app/shared/models/eventType.model";
import { regexMask } from "src/app/shared/regex";
import { states } from "../../shared/states";
import { Guid } from "src/app/shared/guid";
import * as fromApp from "src/app/store/app.reducer";
import * as ClientActions from "../../clients/store/client.actions";
import * as FieldActions from "../../fields/store/field.actions";
import * as EventActions from "../../events/store/event.actions";
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
    const field = this.fillFieldObject();
    this.addEvents(field.events);
    this.addField(field);
  }

  private addEvents(events: Event[]) {
    events.forEach(event => {
      this.store.dispatch(EventActions.addEvent({ event }));
    });
  }

  private addField(field: Field) {
    this.store.dispatch(FieldActions.addField({ field }));
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
    newField.client = this.getClientByIndex(fieldForm.clientIndex)._id;
    newField.active = fieldForm.active;
    newField.events = this.formatEvents(fieldForm.events, newField._id);

    return newField;
  }

  private formatEvents(events: Event[], fieldId: string): Event[] {
    const newEvents: Event[] = [];

    events.forEach((event: Event) => {
      const formattedEvent = Event.new();

      formattedEvent._id = Guid.isGuid(event._id) ? event._id : Guid.new();
      formattedEvent.date = event.date;
      formattedEvent.eventType = this.getEventTypeByIndex(event.eventType)._id;
      formattedEvent.field = fieldId;
      newEvents.push(formattedEvent);
    });

    return newEvents;
  }

  private getClientByIndex(clientIndex: number) {
    return this.clients[clientIndex];
  }

  onAddEvent() {
    if (this.eventTypes && this.eventTypes.length === 0) {
      this.eventTypeStoreSub = this.loadEventTypes().subscribe(
        activeEventTypes => {
          this.eventTypes = activeEventTypes;
        }
      );
    }
    const newEvent = Event.new();
    this.events.push(newEvent);
    const eventFormGroup = new FormGroup({
      _id: new FormControl(newEvent._id),
      eventType: new FormControl(-1, Validators.required),
      date: new FormControl(newEvent.date, Validators.required)
    });
    this.getEvents().push(eventFormGroup);
  }

  onCancel() {
    this.router.navigate(["../"], { relativeTo: this.route });
  }

  onDeleteEvent(index: number) {
    this.events.splice(index, 1);
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

  private getEventType(eventTypeId: string): EventType {
    const eventType = this.eventTypes.find(et => {
      return et._id === eventTypeId;
    });
    return eventType;
  }

  private getEventTypeByIndex(index: number | string): EventType {
    const eventType = this.eventTypes[+index];
    return eventType;
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
      events: new FormArray([]),
      clientIndex: new FormControl(this.clientIndex, Validators.required),
      active: new FormControl(this.field.active, Validators.required)
    });
    this.createEventsControls();
  }

  private createEventsControls() {
    this.eventTypeStoreSub = this.loadEventTypes().subscribe(
      activeEventTypes => {
        this.eventTypes = activeEventTypes;

        this.resetEventControl();
        this.events.forEach(event => {
          const eventTypeIndex =
            this.eventTypes.length > 0
              ? this.getEventTypeIndex(event.eventType)
              : -1;
          (this.fieldForm.get("events") as FormArray).push(
            new FormGroup({
              _id: new FormControl(event._id, Validators.required),
              eventType: new FormControl(eventTypeIndex, Validators.required),
              date: new FormControl(
                this.getDateYYYYMMDD(event.date),
                Validators.required
              )
            })
          );
        });
      }
    );
  }
  resetEventControl() {
    while ((this.fieldForm.get("events") as FormArray).length > 0) {
      (this.fieldForm.get("events") as FormArray).removeAt(0);
    }
  }

  getDateYYYYMMDD(date: Date): string {
    const DATE_TIME_SEPARATOR = "T";
    const dateString = date.toString().split(DATE_TIME_SEPARATOR);
    const formatedDate = dateString[0];
    return formatedDate;
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
        this.events = this.field.events;
        this.clientIndex = this.getClientIndex(editedField);
        this.stateIndex = states.getStateIndex(this.field.state);
      });
    if (this.field.events.length > 0) {
      this.eventTypeStoreSub = this.loadEventTypes().subscribe(
        activeEventTypes => {
          this.eventTypes = activeEventTypes;
        }
      );
    }
  }

  private getClientIndex(editedField: Field): number {
    return this.clients
      .map(c => c._id.toString())
      .indexOf(editedField.client.toString());
  }

  private getEventTypeIndex(eventTypeId: string): number {
    return this.eventTypes.map(et => et._id.toString()).indexOf(eventTypeId);
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

  private loadEventTypes(): Observable<EventType[]> {
    this.store.dispatch(EventTypeActions.fetchEventTypes());
    return this.store.select("eventType").pipe(
      map(eventTypeState => {
        return eventTypeState.eventTypes.filter(c => {
          return c.active;
        });
      }),
      tap(results => {
        results.sort();
      })
    );
  }
}
