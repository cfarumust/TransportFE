import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { LoadingService } from './services/loading.service';
import { DataShareService } from './services/dataShareService';

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
    public shareService: DataShareService,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

/*       const token = localStorage.getItem('ACCESS_TOKEN');

      if (token) {
        const loginName = localStorage.getItem('loginName');
        if (loginName && loginName === 'clientlogin') {
          this.shareService.setLoginDetails('clientlogin');
          this.router.navigate(['/orders']);
        }

        if (loginName && loginName === 'shipperlogin') {
          this.shareService.setLoginDetails('shipperlogin');
          this.router.navigate(['/orders']);
        }
      } */
    });
  }
}
