import { Component, OnInit, Input } from "@angular/core";

import { Field } from "src/app/shared/models/field.model";

@Component({
  selector: "app-field-item",
  templateUrl: "./field-item.component.html",
  styleUrls: ["./field-item.component.css"]
})
export class FieldItemComponent implements OnInit {
  @Input() field: Field;
  @Input() index: number;

  ngOnInit() {}
}
