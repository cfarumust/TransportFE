import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { screen1Config } from './set-order.config';
import { Storage } from '@ionic/storage';
import { AuthService } from '../../services/auth.service';
import { MapsAPILoader } from '@agm/core';
import { Router } from '@angular/router';
import { FormService } from '../../services/form-service.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-screen1',
  templateUrl: './set-order.page.html',
  styleUrls: ['./set-order.page.scss'],
})
export class SetOrderPage implements OnInit {

  constructor(
    private formService: FormService,
    private storage: Storage,
    public auth: AuthService,
    public mapsAPILoader: MapsAPILoader,
    public ngZone: NgZone,
    public router: Router,
    public alertCtrl: AlertController,
  ) { }

  form = new FormGroup({});
  model = {
    NBOXCOUNT: null,
    NBOXID: null,
    DTDROPDATE: null,
    DTPICKUPDATE: null,
    NDROPLAT: null,
    NDROPLONG: null,
    NPICKUPLAT: null,
    NPICKUPLONG: null,
    NDISTANCE: null,
    NCLIENTID: null,
    SADDRESSPICKUP: null,
    SADDRESSDROP: null
  };

  fields: FormlyFieldConfig[] = screen1Config;
  homeIcon = '../../assets/images/shipping_icon.png';

  @ViewChild('fromSearch', { static: false }) fromSearch: ElementRef;
  @ViewChild('toSearch', { static: false }) toSearch: ElementRef;

  async onSubmit() {
    if (this.form.valid) {
      const token = await this.storage.get('ACCESS_TOKEN');
      const clientId = await this.storage.get('NCLIENTID');

      if (token && clientId) {
        this.model.NDISTANCE = this.getDistance();
        this.model.NCLIENTID = clientId;
        this.formatDate();
        console.log(this.model);
        this.formService.sendOrder(this.model, token).subscribe((res) => {
          /* const navigationExtras: NavigationExtras = {
            queryParams: {
              data: JSON.stringify(this.model)
            }
          };
          this.router.navigate(['tracker'], navigationExtras); */
        }, (error) => {
          console.log(error);
        });
      } else {
        this.showAlert('Error', 'unauthorized access, please login to continue');
        this.router.navigateByUrl('/login');
      }
    }
  }

  formatDate() {
    const pickupDateFormat = new Date(this.model['DTPICKUPDATE']).toLocaleDateString().split('/');
    const pickUpdate = `${pickupDateFormat[2]}-${pickupDateFormat[1]}-${pickupDateFormat[0]}`;
    const pickUpTime = this.model['DTPICKUPTIME'];
    const finalPickupDateTime = `${pickUpdate}T${pickUpTime}:00`;
    this.model['DTPICKUPDATE'] = finalPickupDateTime;
    delete this.model['DTPICKUPTIME'];

    const dropDateFormat = new Date(this.model['DTDROPDATE']).toLocaleDateString().split('/');
    const dropDate = `${dropDateFormat[2]}-${dropDateFormat[1]}-${dropDateFormat[0]}`;
    const dropTime = this.model['DTDROPTIME'];
    const finalDropDateTime = `${dropDate}T${dropTime}:00`;
    this.model['DTDROPDATE'] = finalDropDateTime;
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
              this.model.NPICKUPLAT = place.geometry.location.lat();
              this.model.NPICKUPLONG = place.geometry.location.lng();
              if (this.fromSearch.nativeElement.value) {
                this.model.SADDRESSPICKUP = this.fromSearch.nativeElement.value;
              }
            }

            if (index === 1) {
              this.model.NDROPLAT = place.geometry.location.lat();
              this.model.NDROPLONG = place.geometry.location.lng();
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

  getDistance() {
    const mexicoCity = new google.maps.LatLng({lat: this.model.NPICKUPLAT, lng: this.model.NPICKUPLONG});
    const jacksonville = new google.maps.LatLng({lat: this.model.NDROPLAT, lng: this.model.NDROPLONG});
    const distance = google.maps.geometry.spherical.computeDistanceBetween(mexicoCity, jacksonville);
    return distance / 1000;
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
