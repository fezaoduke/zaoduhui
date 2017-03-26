import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';
import { CenterPage } from "../center/center";
import { ListPage } from "../list/list";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  
  tab1Root: any = HomePage;
  tab2Root: any = ListPage;
  tab3Root: any = AboutPage;
  tab4Root: any = CenterPage;

  constructor() {
  }
}