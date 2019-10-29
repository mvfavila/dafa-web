import { TestBed, inject } from "@angular/core/testing";
import { StoreModule } from "@ngrx/store";
import { APP_BASE_HREF } from "@angular/common";

import { AuthGuard } from "./auth.guard";
import * as fromApp from "../store/app.reducer";
import { AppRoutingModule } from "../app-routing.module";

describe("AuthGuard", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard, { provide: APP_BASE_HREF, useValue: "/" }],
      imports: [
        StoreModule.forRoot(fromApp.appReducer, { runtimeChecks: null }),
        AppRoutingModule
      ]
    });
  });

  it("should create", inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
