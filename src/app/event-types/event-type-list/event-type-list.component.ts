import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { map } from "rxjs/operators";

import { EventType } from "src/app/shared/models/eventType.model";
import * as fromApp from "../../store/app.reducer";

@Component({
  selector: "app-event-type-list",
  templateUrl: "./event-type-list.component.html",
  styleUrls: ["./event-type-list.component.css"]
})
export class EventTypeListComponent implements OnInit, OnDestroy {
  eventTypesChangesSubscription: Subscription;
  eventTypes: EventType[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.eventTypesChangesSubscription = this.store
      .select("eventType")
      .pipe(map(eventTypeState => eventTypeState.eventTypes))
      .subscribe((eventTypes: EventType[]) => {
        this.eventTypes = eventTypes;
      });
  }

  onNewEventType() {
    this.router.navigate(["new"], { relativeTo: this.route });
  }

  ngOnDestroy() {
    if (this.eventTypesChangesSubscription) {
      this.eventTypesChangesSubscription.unsubscribe();
    }
  }
}
