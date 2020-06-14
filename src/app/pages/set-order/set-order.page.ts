import { Component, OnInit, NgZone, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { screen1Config } from './set-order.config';
import { AuthService } from '../../services/auth.service';
import { MapsAPILoader } from '@agm/core';
import { Router, NavigationExtras } from '@angular/router';
import { FormService } from '../../services/form-service.service';
import { AlertController } from '@ionic/angular';
import { LoadingService } from '../../services/loading.service';
import { IOrderModel } from '../../interfaces/orderModel';

export interface IOrderSuccess {
  entity: IOrderModel;
  info: string;
  success: boolean;
}

@Component({
  selector: 'app-screen1',
  templateUrl: './set-order.page.html',
  styleUrls: ['./set-order.page.scss'],
})
export class SetOrderPage implements OnInit, AfterViewInit {

  constructor(
    private formService: FormService,
    public auth: AuthService,
    public mapsAPILoader: MapsAPILoader,
    public ngZone: NgZone,
    public router: Router,
    public alertCtrl: AlertController,
    public loadingService: LoadingService
  ) { }

  form = new FormGroup({});
  model: IOrderModel = {} as IOrderModel;
  options: FormlyFormOptions = {};

  formSearchInput = new FormControl('');
  toSearchInput = new FormControl('');

  fields: FormlyFieldConfig[] = screen1Config;
  homeIcon = '../../assets/images/shipping_icon.png';

  @ViewChild('fromSearch', { static: false }) fromSearch: ElementRef;
  @ViewChild('toSearch', { static: false }) toSearch: ElementRef;

  async onSubmit() {
    if (this.form.valid) {
      this.loadingService.present();
      const token = localStorage.getItem('ACCESS_TOKEN');
      const clientId = localStorage.getItem('nclientid');

      if (token && clientId) {
        this.model.NDISTANCE = this.getDistance();
        this.model.NCLIENTID = parseInt(clientId, 10);
        this.formatDate();
        this.formService.sendOrder(this.model, token).subscribe((res: IOrderSuccess) => {
          if (res.success) {
            this.loadingService.dismiss();
            this.showAlert('Success', res.info);
            this.resetForm();
            this.router.navigate(['/orders']);
          } else {
            this.resetForm();
            this.loadingService.dismiss();
            this.showAlert('Error', res.info);
          }
        }, (error) => {
          this.loadingService.dismiss();
          this.showAlert('Error', 'Somehting went wrong, please try again later');
          console.log(error);
        });
      } else {
        this.loadingService.dismiss();
        this.showAlert('Error', 'unauthorized access, please login to continue');
        this.router.navigate(['/login']);
      }
    }
  }

  public resetForm() {
    this.form.reset();
    this.options.resetModel();
    if (this.fromSearch || this.toSearch) {
      this.fromSearch.nativeElement.value = '';
      this.toSearch.nativeElement.value = '';
    }
  }

  formatDate() {
    const pickupDateFormat = new Date(this.model.DTPICKUPDATE).toLocaleDateString().split('/');
    const pickUpdate = `${pickupDateFormat[2]}-${pickupDateFormat[1]}-${pickupDateFormat[0]}`;
    const pickUpTime = this.model['DTPICKUPTIME'];
    const finalPickupDateTime = `${pickUpdate}T${pickUpTime}:00`;
    this.model.DTPICKUPDATE = finalPickupDateTime;
    delete this.model['DTPICKUPTIME'];

    const dropDateFormat = new Date(this.model.DTDROPDATE).toLocaleDateString().split('/');
    const dropDate = `${dropDateFormat[2]}-${dropDateFormat[1]}-${dropDateFormat[0]}`;
    const dropTime = this.model['DTDROPTIME'];
    const finalDropDateTime = `${dropDate}T${dropTime}:00`;
    this.model.DTDROPDATE = finalDropDateTime;
    delete this.model['DTDROPTIME'];
  }

  ngOnInit() {
    // load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      [this.fromSearch, this.toSearch].forEach((elmRef: ElementRef, index) => {
        const autocomplete = new google.maps.places.Autocomplete(elmRef.nativeElement, {
          types: ['address']
        });
        autocomplete.addListener('place_changed', () => {
          this.ngZone.run(() => {
            const place: google.maps.places.PlaceResult = autocomplete.getPlace();

            if (index === 0) {
              this.model.NPICKUPLAT = Number(place.geometry.location.lat().toPrecision(8));
              this.model.NPICKUPLONG = Number(place.geometry.location.lng().toPrecision(8));
              if (this.fromSearch.nativeElement.value) {
                this.model.SADDRESSPICKUP = this.fromSearch.nativeElement.value;
              }
            }

            if (index === 1) {
              this.model.NDROPLAT = Number(place.geometry.location.lat().toPrecision(8));
              this.model.NDROPLONG = Number(place.geometry.location.lng().toPrecision(8));
              if (this.fromSearch.nativeElement && this.fromSearch.nativeElement.value) {
                this.model.SADDRESSDROP = this.toSearch.nativeElement.value;
              }
            }
            if (place.geometry === undefined || place.geometry === null) {
              return;
            }
          });
        });
      });
    });
  }

  ngAfterViewInit() {
    this.resetForm();
  }

  getDistance() {
    const mexicoCity = new google.maps.LatLng({ lat: this.model.NPICKUPLAT, lng: this.model.NPICKUPLONG });
    const jacksonville = new google.maps.LatLng({ lat: this.model.NDROPLAT, lng: this.model.NDROPLONG });
    const distance = google.maps.geometry.spherical.computeDistanceBetween(mexicoCity, jacksonville);
    return Number((distance / 1000).toFixed(2));
  }


  async showAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

}
