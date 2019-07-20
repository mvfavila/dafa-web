import { createAction, props } from "@ngrx/store";

export const loginStart = createAction(
  "[Auth] Login Start",
  props<{ email: string; password: string }>()
);

export const signupStart = createAction(
  "[Auth] Signup Start",
  props<{ email: string; password: string }>()
);

export const authenticateSuccess = createAction(
  "[Auth] Authenticate Success",
  props<{
    email: string;
    token: string;
    expirationDate: Date;
    redirect: boolean;
  }>()
);

export const authenticateFail = createAction(
  "[Auth] Authenticate Fail",
  props<{ errorMessage: string }>()
);

export const clearError = createAction("[Auth] Clear Error");

export const autoLogin = createAction("[Auth] Auto Login");

export const autoRedirect = createAction(
  "[Auth] Auto Redirect",
  props<{
    redirect: boolean;
  }>()
);

export const logout = createAction("[Auth] Logout");
