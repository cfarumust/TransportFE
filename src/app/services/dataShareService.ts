import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DataShareService {

    loadDetails: any;
    wayPoints: any;
    loginDetails: any;

    constructor() { }

    public setDataOrderLoads(data) {
        this.loadDetails = data;
    }

    public getDataOrderLoads() {
        return this.loadDetails;
    }

    setWayPoints(wayPoints) {
        this.wayPoints = wayPoints;
    }

    getWayPoints() {
        return this.wayPoints;
    }

    setLoginDetails(details: any) {
        this.loginDetails = details;
    }

    getLoginDetails() {
        return this.loginDetails;
    }
}
