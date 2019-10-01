import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AlertTypeEditComponent } from "./alert-type-edit.component";

describe("AlertTypeEditComponent", () => {
  let component: AlertTypeEditComponent;
  let fixture: ComponentFixture<AlertTypeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AlertTypeEditComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertTypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
