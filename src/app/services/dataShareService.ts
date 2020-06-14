import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DataShareService {

    loadDetails: any;
    wayPoints: any;
    loginDetails: any;
    originDdestinationCoords: any;

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

    public setOriginDestinationCoords(data: any) {
        this.originDdestinationCoords = data;
    }

    public getOriginDestinationCoords() {
        return this.originDdestinationCoords;
    }

    setLoginDetails(loginName: string) {
        this.loginDetails = loginName;
        localStorage.setItem('loginName', loginName);
    }

    getLoginDetails() {
        return this.loginDetails;
    }
}
