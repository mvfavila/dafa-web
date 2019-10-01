import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AlertTypeListComponent } from "./alert-type-list.component";

describe("AlertTypeListComponent", () => {
  let component: AlertTypeListComponent;
  let fixture: ComponentFixture<AlertTypeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AlertTypeListComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
