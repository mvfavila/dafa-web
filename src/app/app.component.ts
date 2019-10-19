import {
  Component,
  OnInit,
  OnDestroy,
  Inject,
  PLATFORM_ID
} from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from "@angular/router";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";

import * as fromApp from "./store/app.reducer";
import * as AuthActions from "./auth/store/auth.actions";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit, OnDestroy {
  loading = false;
  percentage = 0;

  private routerSubscription: Subscription;

  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId
  ) {}

  ngOnInit() {
    this.routerSubscription = this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          this.animateProgressBar();
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          this.percentage = 100;
          break;
        }
        default: {
          break;
        }
      }
    });

    if (isPlatformBrowser(this.platformId)) {
      this.store.dispatch(AuthActions.autoLogin());
    }
  }

  async animateProgressBar() {
    for (let delay = 0; delay < 3500; delay += 350) {
      setTimeout(() => {
        if (this.percentage <= 90) {
          this.percentage += 10;
        }
      }, delay);
    }
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}
