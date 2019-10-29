import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { APP_BASE_HREF } from "@angular/common";

import { ClientItemComponent } from "./client-item.component";
import { Client } from "src/app/shared/models/client.model";
import { AuthGuard } from "src/app/auth/auth.guard";
import { AppRoutingModule } from "src/app/app-routing.module";

describe("ClientItemComponent", () => {
  let component: ClientItemComponent;
  let fixture: ComponentFixture<ClientItemComponent>;
  const item = Client.new();
  item.company = "Client company name";
  item.email = "Client e-mail";

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard, { provide: APP_BASE_HREF, useValue: "/" }],
      declarations: [ClientItemComponent],
      imports: [AppRoutingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientItemComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should present EventType company name", () => {
    component.client = item;
    component.index = 0;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector("h4").textContent).toEqual(
      item.company
    );
  });

  it("should present EventType email", () => {
    component.client = item;
    component.index = 0;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector("p").textContent).toEqual(
      item.email
    );
  });
});
