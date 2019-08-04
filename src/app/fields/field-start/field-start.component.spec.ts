import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { FieldStartComponent } from "./field-start.component";

describe("FieldStartComponent", () => {
  let component: FieldStartComponent;
  let fixture: ComponentFixture<FieldStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FieldStartComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
