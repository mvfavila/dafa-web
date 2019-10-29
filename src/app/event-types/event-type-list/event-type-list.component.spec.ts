import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { APP_BASE_HREF } from "@angular/common";

import { EventTypeListComponent } from "./event-type-list.component";
import { AuthGuard } from "src/app/auth/auth.guard";
import { AppRoutingModule } from "src/app/app-routing.module";

describe("EventTypeListComponent", () => {
  let component: EventTypeListComponent;
  let fixture: ComponentFixture<EventTypeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard, { provide: APP_BASE_HREF, useValue: "/" }],
      declarations: [EventTypeListComponent],
      imports: [AppRoutingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventTypeListComponent);
    component = fixture.componentInstance;
    component.eventTypes = [];
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
