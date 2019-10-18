import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { FormGroup, FormControl, FormArray, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { map } from "rxjs/operators";

import { Field } from "../../shared/models/field.model";
import { Client } from "../../shared/models/client.model";
import * as fromApp from "src/app/store/app.reducer";
import * as ClientActions from "../store/client.actions";
import { regexMask } from "../../shared/regex";
import { states, CountryStatesCollection } from "../../shared/states";

const STATE_INITIAL_INDEX = -1;

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
  states: CountryStatesCollection;
  stateIndex: number;

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
    this.states = states;
    this.idSubscription = this.route.params.subscribe((params: Params) => {
      this.index = +params.id;
      this.isEditMode = params.id != null;
    });
    this.client = Client.new();
    this.initForm();
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
      this.store.dispatch(
        ClientActions.addClient({ client: this.fillClientObject() })
      );
    }
    this.router.navigate(["../"], { relativeTo: this.route });
  }

  private fillClientObject(): Client {
    const newClient: Client = { ...this.client };
    const clientForm = this.clientForm.value;

    newClient.firstName = clientForm.firstName;
    newClient.lastName = clientForm.lastName;
    newClient.company = clientForm.company;
    newClient.address = clientForm.address;
    newClient.city = clientForm.city;
    newClient.state = this.states.getStateByIndex(clientForm.stateIndex).name;
    newClient.postalCode = clientForm.postalCode;
    newClient.email = clientForm.email;
    newClient.active = clientForm.active;

    return newClient;
  }

  onCancel() {
    this.router.navigate(["../"], { relativeTo: this.route });
  }

  ngOnDestroy() {
    if (this.idSubscription) {
      this.idSubscription.unsubscribe();
    }
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }

  private initForm() {
    this.setFormDefaultValues();

    if (this.isEditMode) {
      this.initEditFormAttributes();
    }

    this.instantiateClientForm();
  }

  private setFormDefaultValues() {
    this.stateIndex = STATE_INITIAL_INDEX;
  }

  private instantiateClientForm() {
    this.clientForm = new FormGroup({
      firstName: new FormControl(this.client.firstName, [
        Validators.required,
        Validators.pattern(regexMask.TEXT)
      ]),
      lastName: new FormControl(this.client.lastName, [
        Validators.required,
        Validators.pattern(regexMask.TEXT)
      ]),
      company: new FormControl(
        this.client.company,
        Validators.pattern(regexMask.TEXT)
      ),
      address: new FormControl(
        this.client.address,
        Validators.pattern(regexMask.TEXT)
      ),
      city: new FormControl(
        this.client.city,
        Validators.pattern(regexMask.TEXT)
      ),
      stateIndex: new FormControl(this.stateIndex),
      postalCode: new FormControl(
        this.client.postalCode,
        Validators.pattern(regexMask.POSTAL_CODE)
      ),
      email: new FormControl(this.client.email, [
        Validators.required,
        Validators.email
      ]),
      active: new FormControl(this.client.active, Validators.required)
    });
  }

  get firstName() {
    return this.clientForm.get("firstName");
  }

  get lastName() {
    return this.clientForm.get("lastName");
  }

  get postalCode() {
    return this.clientForm.get("postalCode");
  }

  get email() {
    return this.clientForm.get("email");
  }

  private initEditFormAttributes() {
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
        this.stateIndex = states.getStateIndex(this.client.state);
      });
  }
}
