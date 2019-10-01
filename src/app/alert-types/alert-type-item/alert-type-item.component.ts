import { Component, OnInit, Input } from "@angular/core";

import { AlertType } from "src/app/shared/models/alertType.model";

@Component({
  selector: "app-alert-type-item",
  templateUrl: "./alert-type-item.component.html",
  styleUrls: ["./alert-type-item.component.css"]
})
export class AlertTypeItemComponent implements OnInit {
  @Input() alertType: AlertType;
  @Input() index: number;

  ngOnInit() {}
}
