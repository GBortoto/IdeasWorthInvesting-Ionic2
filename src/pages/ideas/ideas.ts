import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { AboutPage } from '../about/about';

import { SingInProvider } from '../../providers/sing-in/sing-in';
import { GetIdeasServiceProvider } from '../../providers/get-ideas-service/get-ideas-service';

@IonicPage()
@Component({
  selector: 'page-ideas',
  templateUrl: 'ideas.html',
  providers: [GetIdeasServiceProvider]
})
export class IdeasPage {

  // About.ts
  threads: any;
  currentIdea: any;

  threadsOptions: string = "Discussions";

  // Home.ts
  ideas: any[] = new Array(10);

  // Ideas.ts
  private my_ideas: any = [];

  private user_pk: any;
  private user_token: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public getIdeas: GetIdeasServiceProvider,
    public modalCtrl: ModalController) {
    // Home.ts
    for(var i = 0; i < 10; i++) {
      var idea = {
        name: "Ideia inovadora nº" + i+1 + "!",
        content: "Eu sou o texto de descrição da revolucionaria ideia " + i+1 +
                 ", que consiste neste objetivo específico: Objetivo"
      }
    this.ideas[i] = idea;
    }
  }

  ionViewDidLoad() {
     this.user_pk = this.navParams.get('user').pk;
     this.user_token = this.navParams.get('token');

     this.listIdeas();
  }

  listIdeas() {
    this.getIdeas.setUserID(this.user_pk);
    this.getIdeas.getRemoteData().subscribe(data => this.my_ideas = data);
  }

  // About.ts
  goToIdea(idea) {
    this.currentIdea = idea;
  }

  addNewIdea(){
     const myModal = this.modalCtrl.create('ModalPage', {userID: this.user_pk});

     myModal.present();
  }
}
