import { Component } from '@angular/core';
import { Platform, App, IonicApp, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RootPage } from './root.page';

@Component({
  template: `<ion-nav></ion-nav>`
})
export class MyApp {
  rootPage:any = 'TabsPage';

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private app:App, private _ionicApp: IonicApp, private _menu: MenuController) {
    platform.ready().then(() => {
      this.app.getRootNav().setRoot (RootPage);
      statusBar.styleDefault();
      splashScreen.hide();
      this.setupBackButtonBehavior ();
    });
  }

  private setupBackButtonBehavior () {
		// If on web version (browser)
		if (window.location.protocol !== "file:") {
			// Register browser back button action(s)
			window.onpopstate = (evt) => {
				// Close any active modals or overlays
				let activePortal = this._ionicApp._loadingPortal.getActive() ||
					this._ionicApp._modalPortal.getActive() ||
					this._ionicApp._toastPortal.getActive() ||
					this._ionicApp._overlayPortal.getActive();
					if (activePortal) {
						activePortal.dismiss();
						return;
				}

				// Navigate back
				if (this.app.getRootNav().canGoBack()){
					this.app.getRootNav().pop();
					return;
				}
				// Close menu if open
				if (this._menu.isOpen()) {
					this._menu.close ();
					return;
				}
			};
			// Fake browser history on each view enter
			this.app.viewDidEnter.subscribe((app) => {
				history.pushState (null, null, "");
			});
		}
	}

}
