import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { EventTypeItemComponent } from "./event-type-item.component";

describe("EventTypeItemComponent", () => {
  let component: EventTypeItemComponent;
  let fixture: ComponentFixture<EventTypeItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EventTypeItemComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventTypeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
