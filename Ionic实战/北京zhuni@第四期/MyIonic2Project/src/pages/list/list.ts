import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';



@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  items: String[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param


  }
  ngOnInit() {
    this.items = ['文章1', '文章2','文章3'];
  }

  


}
