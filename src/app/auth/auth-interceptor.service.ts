import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpParams,
  HttpHeaders
} from "@angular/common/http";
import { take, exhaustMap, map } from "rxjs/operators";
import { Store } from "@ngrx/store";

import { AuthService } from "./auth.service";
import * as fromApp from "../store/app.reducer";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.store.select("auth").pipe(
      take(1),
      map(authState => {
        return authState.user;
      }),
      exhaustMap(user => {
        if (!user) {
          return next.handle(req);
        }
        const modifiedReq = req.clone({
          // params: new HttpParams().set("auth", user.token),
          headers: new HttpHeaders()
            .set("authorization", `Token ${user.token}`)
            .set("Accept", "application/json")
            .set("Content-Type", "application/json")
            .set("Access-Control-Allow-Credentials", "true")
        });
        return next.handle(modifiedReq);
      })
    );
  }
}
