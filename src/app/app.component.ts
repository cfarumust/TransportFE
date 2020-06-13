import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  loader: HTMLIonLoadingElement;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public auth: AuthService,
    public router: Router,
    public loadingController: LoadingController,
    public loadingService: LoadingService,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

/*       this.storage.get('ACCESS_TOKEN').then((token) => {
        this.loadingService.present();
        if (token) {
          this.loadingService.dismiss();
          this.router.navigate(['/orders']);
        } else {
          this.loadingService.dismiss();
          this.router.navigate(['/login']);
        }
      }); */
    });
  }
}
