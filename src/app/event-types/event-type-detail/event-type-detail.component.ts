import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import { map, switchMap } from "rxjs/operators";

import { EventType } from "../../shared/models/eventType.model";
import * as fromApp from "src/app/store/app.reducer";
import * as EventTypeActions from "../store/event-type.actions";

@Component({
  selector: "app-event-type-detail",
  templateUrl: "./event-type-detail.component.html",
  styleUrls: ["./event-type-detail.component.css"]
})
export class EventTypeDetailComponent implements OnInit, OnDestroy {
  eventType: EventType;
  selectedId: number;
  eventTypeIdSubscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.eventTypeIdSubscription = this.route.params
      .pipe(
        map(params => {
          return +params.id;
        }),
        switchMap(id => {
          this.selectedId = id;
          return this.store.select("eventType");
        }),
        map(eventTypesState => {
          return eventTypesState.eventTypes.find((_, index) => {
            return index === this.selectedId;
          });
        })
      )
      .subscribe(eventType => {
        this.eventType = eventType;
      });
  }

  onDelete() {
    this.store.dispatch(
      EventTypeActions.deleteEventType({ index: this.selectedId })
    );
    this.router.navigate(["/eventTypes"]);
  }

  ngOnDestroy() {
    if (this.eventTypeIdSubscription) {
      this.eventTypeIdSubscription.unsubscribe();
    }
  }
}
