import { Component, OnInit, Input } from "@angular/core";

import { EventType } from "src/app/shared/models/eventType.model";

@Component({
  selector: "app-event-type-item",
  templateUrl: "./event-type-item.component.html",
  styleUrls: ["./event-type-item.component.css"]
})
export class EventTypeItemComponent implements OnInit {
  @Input() eventType: EventType;
  @Input() index: number;

  ngOnInit() {}
}
