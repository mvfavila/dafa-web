import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { FormGroup, FormControl, FormArray, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { map } from "rxjs/operators";

import { Field } from "../../shared/models/field.model";
import * as fromApp from "src/app/store/app.reducer";
import * as ClientActions from "../store/client.actions";
import { Client } from "src/app/shared/models/client.model";

@Component({
  selector: "app-client-edit",
  templateUrl: "./client-edit.component.html",
  styleUrls: ["./client-edit.component.css"]
})
export class ClientEditComponent implements OnInit, OnDestroy {
  idSubscription: Subscription;
  index: number;
  client: Client;
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
      this.index = +params.id;
      this.isEditMode = params.id != null;
      this.initForm();
    });
  }

  onSubmit() {
    if (this.isEditMode) {
      this.store.dispatch(
        ClientActions.updateClient({
          index: this.index,
          client: this.fillClientObject()
        })
      );
    } else {
      this.store.dispatch(ClientActions.addClient(this.clientForm.value));
    }
    this.router.navigate(["../"], { relativeTo: this.route });
  }

  private fillClientObject(): Client {
    const newClient: Client = { ...this.client };
    const clientForm = this.clientForm.value;

    newClient.firstName = clientForm.firstName;
    newClient.company = clientForm.company;
    newClient.email = clientForm.email;

    return newClient;
  }

  onManageClient() {
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
    if (this.isEditMode) {
      this.storeSub = this.store
        .select("client")
        .pipe(
          map(clientState => {
            return clientState.clients.find((_, index) => {
              return index === this.index;
            });
          })
        )
        .subscribe(existingClient => {
          this.client = existingClient;
        });
    }

    this.clientForm = new FormGroup({
      firstName: new FormControl(this.client.firstName, Validators.required),
      company: new FormControl(this.client.company, Validators.required),
      email: new FormControl(this.client.email, Validators.required),
      fields: new FormArray(this.createFieldsControls(this.client.fields))
    });
  }
}
