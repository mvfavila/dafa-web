import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AlertTypeItemComponent } from "./alert-type-item.component";
import { AlertType } from "src/app/shared/models/alertType.model";
import { AuthGuard } from "src/app/auth/auth.guard";
import { APP_BASE_HREF } from "@angular/common";
import { AppRoutingModule } from "src/app/app-routing.module";

describe("AlertTypeItemComponent", () => {
  let component: AlertTypeItemComponent;
  let fixture: ComponentFixture<AlertTypeItemComponent>;
  const item = AlertType.new();
  item.name = "AlertType name";
  item.numberOfDaysToWarning = "365";

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard, { provide: APP_BASE_HREF, useValue: "/" }],
      declarations: [AlertTypeItemComponent],
      imports: [AppRoutingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertTypeItemComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should present EventType name", () => {
    component.alertType = item;
    component.index = 0;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector("h4").textContent).toEqual(
      item.name
    );
  });

  it("should present EventType email", () => {
    component.alertType = item;
    component.index = 0;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector("p").textContent).toEqual(
      item.numberOfDaysToWarning
    );
  });
});
