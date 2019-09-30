import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { EventTypeStartComponent } from "./event-type-start.component";

describe("EventTypeStartComponent", () => {
  let component: EventTypeStartComponent;
  let fixture: ComponentFixture<EventTypeStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EventTypeStartComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventTypeStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
