import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, zip, from, forkJoin } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private httpClient: HttpClient) { }

  public url = 'https://www.mishnmash.de';

  sendOrder(data: any, token: string): Observable<any> {
    return this.httpClient.post<any>(`${this.url}/order`,  data, this.getAuthHeaders(token));
  }

  getOrders(clientId: number, token: string): Observable<any> {
    return this.httpClient.get<any>(`${this.url}/order/client/${clientId}`, this.getAuthHeaders(token));
  }

  getLoadsAvailable(token: string): Observable<any> {
    return this.httpClient.get<any>(`${this.url}/load/shipper/loads-available`, this.getAuthHeaders(token));
  }

  assignToLoad(data: any, token: string) {
    return this.httpClient.put<any>(`${this.url}/load/shipper/assign_to_load`,  data, this.getAuthHeaders(token));
  }

  acceptDelivery(data: any, token: string) {
    return this.httpClient.put<any>(`${this.url}/load/shipper/loadcompleted`,  data, this.getAuthHeaders(token));
  }

  getShipperLoads(shipperId: number, token: string) {
    return this.httpClient.get<any>(`${this.url}/load/shipper/shipperid/${shipperId}`, this.getAuthHeaders(token));
  }

  getOrderDetails(orderId: number, token: string) {
    const urls = [`${this.url}/load/client/orderid/${orderId}`, `${this.url}/order/route/${orderId}`];

    return forkJoin([
      this.httpClient.get<any>(`${this.url}/load/client/orderid/${orderId}`, this.getAuthHeaders(token)),
      this.httpClient.get<any>(`${this.url}/order/route/${orderId}`, this.getAuthHeaders(token))
    ]);
  }

  getHeaders(): { headers: HttpHeaders } {
    const headerDict = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers': 'Accept'
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return requestOptions;
  }

  public getAuthHeaders(token: string): { headers: HttpHeaders } {
    const headersOptions = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers': 'Accept',
      Authorization: 'Bearer ' + token,
    };

    const requestOptions = {
      headers: new HttpHeaders(headersOptions),
    };

    return requestOptions;
  }

}
