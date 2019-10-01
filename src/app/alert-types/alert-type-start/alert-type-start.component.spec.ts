import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AlertTypeStartComponent } from "./alert-type-start.component";

describe("AlertTypeStartComponent", () => {
  let component: AlertTypeStartComponent;
  let fixture: ComponentFixture<AlertTypeStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AlertTypeStartComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertTypeStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
