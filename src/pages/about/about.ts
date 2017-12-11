import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

//import { App } from 'ionic-framework/ionic';
//import { ThreadPage } from '../thread/thread';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  threads: any;
  currentIdea: any;

  threadsOptions: string = "Discussions";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.currentIdea = navParams.get('currentIdea');
    //console.log("Current idea: " + this.currentIdea.name);
    //this.threadsOptions = "Discussions";
    //getThreads(nomeDaThreadAtual);
  }

  getThreads(n) {
    /*
    this.RestapiServiceProvider.getUsers(n)
    .then(data => {
      this.threads = data;
    });
    */
  }
}
