import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';

import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {

	private tagUrl: string = 'http://iwiaccount.pythonanywhere.com/tag/';
	private ideaUrl: string = 'http://iwiaccount.pythonanywhere.com/idea/';
	private ideaGroupUrl: string = 'http://iwiaccount.pythonanywhere.com/ideagroup/';

	ideaInfo: any;

	title: string;
	description: string;
	tags: string;
	tag_list: any[] = [];


  constructor(private view: ViewController, private navParams: NavParams, public http: Http) {
  	this.title = null;
  	this.description = null;
  	this.tags = null;
  }

  closeModal(){
  	this.view.dismiss();
  }

  addNewIdea(){
  	if(!this.checkTitle(this.title)) {
      this.sendError("title");
      return;
    };
    if(!this.checkDescription(this.description)) {
      this.sendError("description");
      return;
    };
    this.splitTags();
    console.log("Chegou até aqui 1");
    var info1 = {
    	title: this.title,
    	description: this.description
    }
    console.log("Chegou até aqui 2");
    this.addIdea(info1);
    //console.log("Chegou até aqui 3");
    
    
    //console.log("Chegou até aqui 7");
  }

  checkTitle(title) {
    // null
    if(!title){
      return 0;
    }

    // Length
    if(title.length < 4 || title.length > 32){
      return 0;
    }
    
    return 1;
  }

  checkDescription(description) {
    // null
    if(!description){
      return 0;
    }
    
    // Length
    if(description.length < 4 || description.length > 200){
      return 0;
    }
    
    return 1;
  }

  sendError(value){
    if(value == "title") {
        alert("Please enter a valid title");
        document.getElementById('title').style.backgroundColor = "lightpink";
        return;
    }

    if(value == "description") {
        alert("Please enter a valid description");
        document.getElementById('description').style.backgroundColor = "lightpink";
        return;
    }
    if(value == "tags") {
        alert("Please enter only valid tags");
        document.getElementById('tags').style.backgroundColor = "lightpink";
        return;
    }
  }

  splitTags(){
  	var resultado = this.tags.split(' ');

  	console.log(resultado);

  	for(var i=0; i<resultado.length; i++){
  		
  		if(resultado[i].length < 2 || resultado[i].length > 200){
  			console.log("Teste 1: " + resultado[i]);
  			this.sendError('tags');
  			return -1;
  		} else {
  			console.log("Teste 2: " + resultado[i]);
  			this.tag_list.push(resultado[i]);
  		}
  	}
  }

  addIdea(info) {
  	console.log("***addIdea()");
  	console.log(info);
  	let headers = new Headers();
  	headers.append('Content-Type', 'application/json');


  	this.http.post(this.ideaUrl,
  		JSON.stringify(info), {headers: headers})
  	.map(res => res.json())
  	.subscribe(
  		(data) => {
  			console.log("addIdea - Resultado:");
  			console.log(data);

  			this.ideaInfo = data;
  			console.log(this.ideaInfo);
  			var info2 = {
    			idea: this.ideaInfo.id,
    			user: this.navParams.get('userID'),
    			is_admin: 1
  			}
    		console.log("Chegou até aqui 3");
    		this.addIdeaGroup(info2);

    		console.log("Chegou até aqui 4");
		    for(var i=0; i<this.tag_list.length; i++){
		    	var info3 = {
		    		idea: this.ideaInfo.id,
		    		name: this.tag_list[i]
		    	}
		    	console.log("Chegou até aqui 5");
		    	this.addTag(info3);
		    }
   		},

   		(err) => {
   			console.log(err);
   		},
   	)
  }

  addIdeaGroup(info) {
  	console.log("***addIdeaGroup()");
  	console.log(info);

  	let headers = new Headers();
  	headers.append('Content-Type', 'application/json');


  	this.http.post(this.ideaGroupUrl,
  		JSON.stringify(info), {headers: headers})
  	.map(res => res.json())
  	.subscribe(
  		(data) => {
  			console.log("addIdeaGroup - Resultado:");
  			console.log(data);
  			//this.user_info = data,
  			//console.log(this.user_info);
   		},

   		(err) => {
   			console.log(err);
   		},
   	)
  }
	
  addTag(info) {
  	console.log("***addTag()");
  	console.log(info);
  	let headers = new Headers();
  	headers.append('Content-Type', 'application/json');


  	this.http.post(this.tagUrl,
  		JSON.stringify(info), {headers: headers})
  	.map(res => res.json())
  	.subscribe(
  		(data) => {
  			console.log("addTag - Resultado:");
  			console.log(data);
  			//this.user_info = data,
  			//console.log(this.user_info);
   		},

   		(err) => {
   			console.log(err);
   		},
   	)
  }

  resetColor(value) {
    if(value) {
      document.getElementById(value).style.backgroundColor = "white";
    }
  }
}
