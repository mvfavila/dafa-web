import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { StoreModule } from "@ngrx/store";
import { StoreRouterConnectingModule } from "@ngrx/router-store";
import { EffectsModule } from "@ngrx/effects";

import { AuthInterceptorService } from "./auth/auth-interceptor.service";
import { AuthEffects } from "./auth/store/auth.effects";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { HeaderComponent } from "./header/header.component";
import { SharedModule } from "./shared/shared.module";
import { ClientEffects } from "./clients/store/client.effects";
import * as fromApp from "./store/app.reducer";

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: "dafaApp" }),
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([AuthEffects, ClientEffects]),
    StoreRouterConnectingModule.forRoot(),
    SharedModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
