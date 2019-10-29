import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { APP_BASE_HREF } from "@angular/common";

import { FieldItemComponent } from "./field-item.component";
import { AuthGuard } from "src/app/auth/auth.guard";
import { AppRoutingModule } from "src/app/app-routing.module";
import { Field } from "src/app/shared/models/field.model";

describe("FieldItemComponent", () => {
  let component: FieldItemComponent;
  let fixture: ComponentFixture<FieldItemComponent>;
  const item = Field.new();
  item.name = "Field name";
  item.email = "email@email.com";

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard, { provide: APP_BASE_HREF, useValue: "/" }],
      declarations: [FieldItemComponent],
      imports: [AppRoutingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldItemComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should present Field name", () => {
    component.field = item;
    component.index = 0;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector("h4").textContent).toEqual(
      item.name
    );
  });

  it("should present Field email", () => {
    component.field = item;
    component.index = 0;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector("p").textContent).toEqual(
      item.email
    );
  });
});
