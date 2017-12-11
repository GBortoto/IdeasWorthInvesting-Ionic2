import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class SignUpInfoProvider {

  private url: string = "http://iwiaccount.pythonanywhere.com/rest-auth/registration/"

  constructor(private http: Http) {

  }

  createUser(info) {  
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    this.http.post(this.url,
    JSON.stringify(info), {headers: headers})
    .map(res => res.json())
    .subscribe(data => {
    	console.log(data)
   	})
  }


}
