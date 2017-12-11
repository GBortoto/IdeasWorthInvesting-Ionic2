import { Component } from '@angular/core';

import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { IdeasPage } from '../ideas/ideas';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = IdeasPage;
  tab3Root = ContactPage;

  constructor() {

  }

}
