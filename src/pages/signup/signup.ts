import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { LoginPage } from '../login/login';

import { SignUpInfoProvider } from '../../providers/sign-up-info/sign-up-info';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
  providers: [SignUpInfoProvider]
})

export class SignupPage {

  username: string;
  password1: string;
  password2: string;
  email: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public signUpInfo: SignUpInfoProvider, private alertCtrl: AlertController) {
      this.username = null;
      this.password1 = null;
      this.password2 = null;
      this.email = null;
  }

  signUp() {
    if(!this.checkUsername(this.username)) {
      this.sendError("username");
      return;
    };
    if(!this.checkPassword(this.password1)) {
      this.sendError("password1");
      return;
    };
    if(!this.checkPassword(this.password2)) {
      this.sendError("password2");
      return;
    }
    if(!this.checkTwoPasswords(this.password1, this.password2)) {
      this.sendError("twopasswords");
      return;
    }
    if(!this.checkEmail(this.email)) {
      this.sendError("email");
      return;
    };


    var info = {
      username:   this.username,
      password1:  this.password1,
      password2:  this.password2,
      email:      this.email,
    }

    this.signUpInfo.createUser(info);
    this.successAlert();
    this.navCtrl.push(LoginPage);
  }

  successAlert() {
    let alert = this.alertCtrl.create({
      title: 'Account created!',
      subTitle: 'Welcome to Ideas Worth Investing!',
      buttons: ['Login'],
    });
    alert.present();
  }

  checkUsername(username) {
    // null
    if(!username) {
      return 0;
    }

    // Length
    if(username.length < 6 || username.length > 16) {
      return 0;
    }

    return 1;
  }

  checkPassword(password) {
    // null
    if(!password) {
      console.log("password null");
      return 0;
    }
    
    // Length
    if(password.length < 8 || password.length > 20) {
      console.log("password small or big");
      return 0;
    }

    return 1;
  }

  checkTwoPasswords(password, password2) {
    // Same passwords
    if(password != password2) {
      return 0;
    }

    return 1;
  }

  checkEmail(email) {
    // null
    if(!email) {
      return 0;
    }

    // Cointains '@' and a '.'
    if(email.indexOf("@") < 0 || email.indexOf(".") < 0) {
      return 0;
    }

    return 1;
  }

  sendError(value) {
    if(value == "username") {
        alert("Please enter a valid username");
        document.getElementById('username').style.backgroundColor = "lightpink";
        return;
    }

    if(value == "password") {
        alert("Please enter a valid password");
        document.getElementById('password1').style.backgroundColor = "lightpink";
        return;
    }

    if(value == "password2") {
        alert("Please enter a valid password");
        document.getElementById('password2').style.backgroundColor = "lightpink";
        return;
    }

    if(value == "twopasswords") {
        alert("Please make sure to confirm the password");
        document.getElementById('password1').style.backgroundColor = "lightpink";
        document.getElementById('password2').style.backgroundColor = "lightpink";
        return;
    }

    if(value == "email") {
        alert("Please enter a valid email");
        document.getElementById('email').style.backgroundColor = "lightpink";
        return;
    }

  }

  resetColor(value) {
    if(value) {
      document.getElementById(value).style.backgroundColor = "white";
    }
  }

}
