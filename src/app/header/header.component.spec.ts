import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { StoreModule } from "@ngrx/store";

import { HeaderComponent } from "./header.component";
import * as fromApp from "../store/app.reducer";

describe("HeaderComponent", () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [StoreModule.forRoot(fromApp.appReducer)]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should render title in a <a> tag", () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector("a").textContent).toContain("Dafa");
  });
});
