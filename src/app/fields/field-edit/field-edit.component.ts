import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { FormGroup, FormControl, FormArray, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { map } from "rxjs/operators";

import { Event } from "../../shared/models/event.model";
import * as fromApp from "src/app/store/app.reducer";
import * as FieldActions from "../store/field.actions";

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

  private storeSub: Subscription;

  get fieldsControls() {
    return this.getFields().controls;
  }

  getFields() {
    return this.fieldForm.get("fields") as FormArray;
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
    if (this.isEditMode) {
      this.store.dispatch(
        FieldActions.updateField({
          index: this.id,
          field: this.fieldForm.value
        })
      );
    } else {
      this.store.dispatch(FieldActions.addField(this.fieldForm.value));
    }
    this.router.navigate(["../"], { relativeTo: this.route });
  }

  onManageField() {
    // this.router.navigate(["../", "fields"], { relativeTo: this.route });
  }

  onCancel() {
    this.router.navigate(["../"], { relativeTo: this.route });
  }

  onDeleteField(index: number) {
    this.getFields().removeAt(index);
  }

  ngOnDestroy() {
    if (this.idSubscription) {
      this.idSubscription.unsubscribe();
    }
    if (this.storeSub) {
      this.storeSub.unsubscribe();
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
    let events = [];

    if (this.isEditMode) {
      this.storeSub = this.store
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
          events = editedField.events;
        });
    }

    this.fieldForm = new FormGroup({
      name: new FormControl(name, Validators.required),
      description: new FormControl(description, Validators.required),
      email: new FormControl(email, Validators.required),
      events: new FormArray(this.createEventsControls(events))
    });
  }
}
