import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class LoadingService {
    isLoading = false;
    loading: HTMLIonLoadingElement;

    constructor(public loadingController: LoadingController) { }

    async dismiss() {
        this.isLoading = false;
    }
    private async presentLoading(msg: string) {
        const loading = await this.loadingController.create({
            message: msg,
            spinner: 'circles'
        });
        await loading.present();
        const timer = setInterval(() => {
            if (!this.isLoading) {
                loading.dismiss();
                clearInterval(timer);
            }
        }, 200);
    }
    async present() {
        this.isLoading = true;
        await this.presentLoading('Please wait...');
    }
}
