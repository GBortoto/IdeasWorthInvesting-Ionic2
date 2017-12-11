import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	ideas: any[] = new Array(10);

  constructor(public navCtrl: NavController) {
	for(var i=0; i<10;i++){
  		var idea = {
  			name: "Ideia inovadora nº" + i+1 + "!",
  			content: "Eu sou o texto de descrição da revolucionaria ideia " + i+1 + ", que consiste neste objetivo específico: Objetivo"
  		}
  	this.ideas[i] = idea;
  	}
  }

}
