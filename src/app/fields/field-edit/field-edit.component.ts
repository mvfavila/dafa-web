import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { FormGroup, FormControl, FormArray, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { map, tap } from "rxjs/operators";

import { Event } from "../../shared/models/event.model";
import { Client } from "src/app/shared/models/client.model";
import { EventType } from "src/app/shared/models/eventType.model";
import * as fromApp from "src/app/store/app.reducer";
import * as FieldActions from "../store/field.actions";
import * as ClientActions from "../../clients/store/client.actions";
import * as EventTypeActions from "../../event-types/store/event-type.actions";

@Component({
  selector: "app-field-edit",
  templateUrl: "./field-edit.component.html",
  styleUrls: ["./field-edit.component.css"]
})
export class FieldEditComponent implements OnInit, OnDestroy {
  idSubscription: Subscription;
  id: number;
  isEditMode = false;
  fieldForm: FormGroup;
  clients: Client[] = [];
  events: Event[] = [];
  eventTypes: EventType[] = [];

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
      this.id = +params.id;
      this.isEditMode = params.id != null;
      this.initForm();
    });
  }

  onSubmit() {
    console.log(`Form value: ${JSON.stringify(this.fieldForm.value, null, 2)}`);

    // if (this.isEditMode) {
    //   this.store.dispatch(
    //     FieldActions.updateField({
    //       index: this.id,
    //       field: this.fieldForm.value
    //     })
    //   );
    // } else {
    //   this.store.dispatch(FieldActions.addField(this.fieldForm.value));
    // }
    // this.router.navigate(["../"], { relativeTo: this.route });
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
    let name = "";
    let description = "";
    let email = "";
    let clientEvents: Event[] = [];
    let client = -1;

    this.loadClients();

    if (this.isEditMode) {
      this.fieldStoreSub = this.store
        .select("field")
        .pipe(
          map(fieldState => {
            return fieldState.fields.find((_, index) => {
              return index === this.id;
            });
          })
        )
        .subscribe(editedField => {
          name = editedField.name;
          description = editedField.description;
          email = editedField.email;
          clientEvents = editedField.events;
          client = this.clients
            .map(c => c._id.toString())
            .indexOf(editedField.client.toString());
        });

      if (clientEvents.length > 0) {
        this.loadEventTypes();
      }
    }

    this.fieldForm = new FormGroup({
      name: new FormControl(name, Validators.required),
      description: new FormControl(description, Validators.required),
      email: new FormControl(email, Validators.required),
      events: new FormArray(this.createEventsControls(clientEvents)),
      client: new FormControl(client, Validators.required)
    });
  }

  private loadClients() {
    this.store.dispatch(ClientActions.fetchClients());
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
