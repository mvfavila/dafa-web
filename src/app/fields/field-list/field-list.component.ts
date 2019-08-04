import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { map } from "rxjs/operators";

import { Field } from "src/app/shared/models/field.model";
import * as fromApp from "../../store/app.reducer";

@Component({
  selector: "app-field-list",
  templateUrl: "./field-list.component.html",
  styleUrls: ["./field-list.component.css"]
})
export class FieldListComponent implements OnInit, OnDestroy {
  fieldsChangesSubscription: Subscription;
  fields: Field[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.fieldsChangesSubscription = this.store
      .select("field")
      .pipe(map(fieldState => fieldState.fields))
      .subscribe((fields: Field[]) => {
        this.fields = fields;
      });
  }

  onNewField() {
    this.router.navigate(["new"], { relativeTo: this.route });
  }

  ngOnDestroy() {
    if (this.fieldsChangesSubscription) {
      this.fieldsChangesSubscription.unsubscribe();
    }
  }
}
