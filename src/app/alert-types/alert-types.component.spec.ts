import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AlertTypesComponent } from "./alert-types.component";

describe("AlertTypesComponent", () => {
  let component: AlertTypesComponent;
  let fixture: ComponentFixture<AlertTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AlertTypesComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
