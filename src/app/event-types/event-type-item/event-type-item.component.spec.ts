import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { APP_BASE_HREF } from "@angular/common";

import { EventTypeItemComponent } from "./event-type-item.component";
import { AuthGuard } from "src/app/auth/auth.guard";
import { AppRoutingModule } from "src/app/app-routing.module";
import { EventType } from "src/app/shared/models/eventType.model";

describe("EventTypeItemComponent", () => {
  let component: EventTypeItemComponent;
  let fixture: ComponentFixture<EventTypeItemComponent>;
  const item = EventType.new();
  item.name = "EventType name";
  item.description = "EventType description";

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard, { provide: APP_BASE_HREF, useValue: "/" }],
      declarations: [EventTypeItemComponent],
      imports: [AppRoutingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventTypeItemComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should present EventType name", () => {
    component.eventType = item;
    component.index = 0;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector("h4").textContent).toEqual(
      item.name
    );
  });

  it("should present EventType email", () => {
    component.eventType = item;
    component.index = 0;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector("p").textContent).toEqual(
      item.description
    );
  });
});
