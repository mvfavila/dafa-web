import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { of } from "rxjs";
import { switchMap, catchError, map, tap } from "rxjs/operators";

import * as AuthActions from "./auth.actions";
import { environment } from "src/environments/environment";
import { User } from "../user.model";
import { AuthService } from "../auth.service";

export interface AuthResponseData {
  email: string;
  token: string;
  expiresIn: string;
}

const handleAuthentication = (
  expiresIn: number,
  email: string,
  token: string
) => {
  const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
  const user = new User(email, token, expirationDate, []);
  localStorage.setItem("userData", JSON.stringify(user));
  return AuthActions.authenticateSuccess({
    email,
    token,
    expirationDate,
    redirect: true
  });
};

const handleError = errorRes => {
  let errorMessage = "An unknown error occurred!";

  if (!errorRes.error || !errorRes.error.error) {
    return of(AuthActions.authenticateFail({ errorMessage }));
  }

  switch (errorRes.error.error.message) {
    case "EMAIL_NOT_FOUND":
    case "INVALID_PASSWORD":
      errorMessage = "Incorrect e-mail and/or password.";
      break;
    case "USER_DISABLED":
      errorMessage = "The user account has been disabled by an administrator.";
      break;
    case "EMAIL_EXISTS":
      errorMessage = "This e-mail is already registered.";
      break;
    case "OPERATION_NOT_ALLOWED":
      errorMessage = "Password sign-in is disabled for this project.";
      break;
    case "TOO_MANY_ATTEMPTS_TRY_LATER":
      errorMessage =
        "We have blocked all requests from this device due to unusual activity. Try again later.";
      break;
  }

  return of(AuthActions.authenticateFail({ errorMessage }));
};

@Injectable()
export class AuthEffects {
  private signupBaseUrl = `${environment.apiUrl}`;
  private loginBaseUrl = `${environment.apiUrl}/users/login`;

  authSignup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signupStart),
      switchMap(signupAction => {
        return this.http
          .post<AuthResponseData>(this.signupBaseUrl, {
            user: {
              email: signupAction.email,
              password: signupAction.password
            }
          })
          .pipe(
            tap(resData => {
              this.authService.setLogoutTimer(+resData.expiresIn * 1000);
            }),
            map(resData => {
              return handleAuthentication(
                +resData.expiresIn,
                resData.email,
                resData.token
              );
            }),
            catchError(errorRes => {
              return handleError(errorRes);
            })
          );
      })
    )
  );

  authLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginStart),
      switchMap(authData => {
        return this.http
          .post<AuthResponseData>(this.loginBaseUrl, {
            user: {
              email: authData.email,
              password: authData.password
            }
          })
          .pipe(
            tap(resData => {
              this.authService.setLogoutTimer(+resData.expiresIn * 1000);
            }),
            map(resData => {
              return handleAuthentication(
                +resData.expiresIn,
                resData.email,
                resData.token
              );
            }),
            catchError(errorRes => {
              return handleError(errorRes);
            })
          );
      })
    )
  );

  authRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.authenticateSuccess),
        tap(
          authSuccessAction =>
            authSuccessAction.redirect && this.router.navigate(["/"])
        )
      ),
    { dispatch: false }
  );

  autoLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.autoLogin),
      map(() => {
        const userData: {
          email: string;
          token: string;
          tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem("userData"));

        if (!userData) {
          return { type: "DUMMY" };
        }

        const loadedUser = new User(
          userData.email,
          userData.token,
          new Date(userData.tokenExpirationDate),
          []
        );

        if (loadedUser.token) {
          const expirationDuration =
            new Date(userData.tokenExpirationDate).getTime() -
            new Date().getTime();
          this.authService.setLogoutTimer(expirationDuration);

          return AuthActions.authenticateSuccess({
            email: loadedUser.email,
            token: loadedUser.token,
            expirationDate: new Date(userData.tokenExpirationDate),
            redirect: false
          });
        }

        return { type: "DUMMY" };
      })
    )
  );

  authLogout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          this.authService.clearLogoutTimer();
          localStorage.removeItem("userData");
          this.router.navigate(["/auth"]);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}
}
