import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { IdeasPage } from '../ideas/ideas';

import { SingInProvider } from '../../providers/sing-in/sing-in';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [SingInProvider]
})
export class LoginPage {

  user_info: any = [];

  username: string;
  password: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public login: SingInProvider) {
      this.username = null;
      this.password = null;
  }

  skip() {
  	this.navCtrl.push(IdeasPage);
  }

  signIn() {
  	if(!this.checkUsername(this.username)) {
      this.sendError("username");
      return;
    };
    if(!this.checkPassword(this.password)) {
      this.sendError("password");
      return;
    };

    var info = {
      username:   this.username,
      password:   this.password
    }

    this.login.userSignIn(info);
    setTimeout(() => {
      this.user_info = this.login.getUserInfo();
      this.navCtrl.push(IdeasPage, this.user_info)
    }, 2000);
  }

  checkUsername(username) {
    // null
    if(!username){
      return 0;
    }

    // Length
    if(username.length < 4 || username.length > 16){
      return 0;
    }
    
    return 1;
  }

  checkPassword(password) {
    // null
    if(!password){
      return 0;
    }
    
    // Length
    if(password.length < 8 || password.length > 20){
      return 0;
    }
    
    return 1;
  }

  sendError(value){
    if(value == "username") {
        alert("Please enter a valid username");
        document.getElementById('username').style.backgroundColor = "lightpink";
        return;
    }

    if(value == "password") {
        alert("Please enter a valid password");
        document.getElementById('password').style.backgroundColor = "lightpink";
        return;
    }
  }

  resetColor(value) {
    if(value){
      document.getElementById(value).style.backgroundColor = "white";
    }
  }

}
