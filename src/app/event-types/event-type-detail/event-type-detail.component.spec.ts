import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { EventTypeDetailComponent } from "./event-type-detail.component";

describe("EventTypeDetailComponent", () => {
  let component: EventTypeDetailComponent;
  let fixture: ComponentFixture<EventTypeDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EventTypeDetailComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventTypeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
