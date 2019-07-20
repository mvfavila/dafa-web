import { TestBed, inject } from "@angular/core/testing";
import { StoreModule } from "@ngrx/store";

import { AuthGuard } from "./auth.guard";
import * as fromApp from "../store/app.reducer";
import { AppRoutingModule } from "../app-routing.module";

describe("AuthGuard", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard],
      imports: [StoreModule.forRoot(fromApp.appReducer), AppRoutingModule]
    });
  });

  it("should create", inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
