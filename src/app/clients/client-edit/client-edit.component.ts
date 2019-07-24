import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { FormGroup, FormControl, FormArray, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { map } from "rxjs/operators";

import { Field } from "../../shared/models/field.model";
import * as fromApp from "src/app/store/app.reducer";
import * as ClientActions from "../store/client.actions";

@Component({
  selector: "app-client-edit",
  templateUrl: "./client-edit.component.html",
  styleUrls: ["./client-edit.component.css"]
})
export class ClientEditComponent implements OnInit, OnDestroy {
  idSubscription: Subscription;
  id: number;
  isEditMode = false;
  clientForm: FormGroup;

  private storeSub: Subscription;

  get fieldsControls() {
    return this.getFields().controls;
  }

  getFields() {
    return this.clientForm.get("fields") as FormArray;
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
        ClientActions.updateClient({
          index: this.id,
          client: this.clientForm.value
        })
      );
    } else {
      this.store.dispatch(ClientActions.addClient(this.clientForm.value));
    }
    this.router.navigate(["../"], { relativeTo: this.route });
  }

  onAddField() {
    this.getFields().push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        city: new FormControl(null, [
          Validators.required
          // Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
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

  private createFieldsControls(fields: Field[]): FormControl[] {
    const fieldsControls = [];
    fields.forEach(field => {
      fieldsControls.push(
        new FormGroup({
          name: new FormControl(field.name, Validators.required),
          city: new FormControl(field.city, [
            Validators.required
            // Validators.pattern(/^[1-9]+[0-9]*$/)
          ])
        })
      );
    });
    return fieldsControls;
  }

  private initForm() {
    let clientFirstName = "";
    let company = "";
    let email = "";
    let fields = [];

    if (this.isEditMode) {
      this.storeSub = this.store
        .select("client")
        .pipe(
          map(clientState => {
            return clientState.clients.find((_, index) => {
              return index === this.id;
            });
          })
        )
        .subscribe(editedClient => {
          clientFirstName = editedClient.firstName;
          company = editedClient.company;
          email = editedClient.email;
          fields = editedClient.fields;
        });
    }

    this.clientForm = new FormGroup({
      firstName: new FormControl(clientFirstName, Validators.required),
      company: new FormControl(company, Validators.required),
      email: new FormControl(email, Validators.required),
      fields: new FormArray(this.createFieldsControls(fields))
    });
  }
}
