import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-alert",
  templateUrl: "./alert.component.html",
  styleUrls: ["./alert.component.css"]
})
export class AlertComponent {
  @Input() message = "";
  // tslint:disable-next-line: no-output-native
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }
}
