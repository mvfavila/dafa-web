import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { FormGroup, FormControl, FormArray, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { map, tap } from "rxjs/operators";

import { Event } from "../../shared/models/event.model";
import * as fromApp from "src/app/store/app.reducer";
import * as FieldActions from "../store/field.actions";
import * as ClientActions from "../../clients/store/client.actions";
import { Client } from "src/app/shared/models/client.model";

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

  private fieldStoreSub: Subscription;
  private clientStoreSub: Subscription;
  private eventStoreSub: Subscription;

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
    this.getEvents().push(
      new FormGroup({
        eventType: new FormControl(null, Validators.required),
        date: new FormControl(null, [
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
    if (this.eventStoreSub) {
      this.eventStoreSub.unsubscribe();
    }
  }

  private createEventsControls(events: Event[]): FormControl[] {
    const eventsControls = [];
    events.forEach(event => {
      eventsControls.push(
        new FormGroup({
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

    this.store.dispatch(ClientActions.fetchClients());
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
        this.loadEvents();
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

  private loadEvents() {
    this.eventStoreSub = this.store
      .select("event")
      .pipe(
        map(eventState => {
          return eventState.events.filter(c => {
            return c.active;
          });
        }),
        tap(results => {
          results.sort();
        })
      )
      .subscribe(activeEvents => {
        this.events = activeEvents;
      });
  }
}
