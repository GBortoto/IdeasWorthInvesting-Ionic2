import { Injectable } from '@angular/core';

import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the SingInProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SingInProvider {

  private url: string = 'http://iwiaccount.pythonanywhere.com/rest-auth/login/';

  public user_info: any;

  constructor(public http: Http) {
    
  }

  userSignIn(info) {
  	let headers = new Headers();
  	headers.append('Content-Type', 'application/json');


  	this.http.post(this.url,
  		JSON.stringify(info), {headers: headers})
  	.map(res => res.json())
  	.subscribe(
  		(data) => {
  			this.user_info = data,
  			console.log(this.user_info);
   		},

   		(err) => {
   			console.log(err);
   		},
   	)
  }

  getUserInfo() {
    return this.user_info;
  }

}
