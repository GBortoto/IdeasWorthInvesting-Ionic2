import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import {Observable} from 'rxjs/Observable'

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

/*
  Generated class for the GetIdeasServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GetIdeasServiceProvider {

  private url: string = "http://iwiaccount.pythonanywhere.com/idea/user/";

  constructor(public http: Http) {

  }

  setUserID(id: number) {
    this.url = this.url + id + "/";
  }

  getRemoteData() {
    return this.http.get(this.url)
      .map(this.extractData)
      .catch(this.handleError)
  }

  private extractData(res: Response) {
    return res.json();
  }

  private handleError(error: Response | any) {
    console.log(error);
    return Observable.throw(error.json().error || "Server error.");
  }

}
