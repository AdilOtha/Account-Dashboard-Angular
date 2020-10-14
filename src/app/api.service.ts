import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiRoute: string

  constructor() { }

  setApiRoute(api:string): void {
    this.apiRoute=api;
  }

  getApiRoute():string{
    return this.apiRoute;
  }
}
