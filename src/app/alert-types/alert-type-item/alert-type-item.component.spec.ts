import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AlertTypeItemComponent } from "./alert-type-item.component";

describe("AlertTypeItemComponent", () => {
  let component: AlertTypeItemComponent;
  let fixture: ComponentFixture<AlertTypeItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AlertTypeItemComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertTypeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
