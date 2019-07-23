import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ClientStartComponent } from "./client-start.component";

describe("ClientStartComponent", () => {
  let component: ClientStartComponent;
  let fixture: ComponentFixture<ClientStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClientStartComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
