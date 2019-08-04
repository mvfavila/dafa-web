import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import { map, switchMap } from "rxjs/operators";

import { Field } from "../../shared/models/field.model";
import * as fromApp from "src/app/store/app.reducer";
import * as FieldActions from "../store/field.actions";

@Component({
  selector: "app-field-detail",
  templateUrl: "./field-detail.component.html",
  styleUrls: ["./field-detail.component.css"]
})
export class FieldDetailComponent implements OnInit, OnDestroy {
  field: Field;
  selectedId: number;
  fieldIdSubscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.fieldIdSubscription = this.route.params
      .pipe(
        map(params => {
          return +params.id;
        }),
        switchMap(id => {
          this.selectedId = id;
          return this.store.select("field");
        }),
        map(fieldsState => {
          return fieldsState.fields.find((_, index) => {
            return index === this.selectedId;
          });
        })
      )
      .subscribe(field => {
        this.field = field;
      });
  }

  onDelete() {
    this.store.dispatch(FieldActions.deleteField({ index: this.selectedId }));
    this.router.navigate(["/fields"]);
  }

  ngOnDestroy() {
    if (this.fieldIdSubscription) {
      this.fieldIdSubscription.unsubscribe();
    }
  }
}
