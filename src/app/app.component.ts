import { Component } from '@angular/core';
import { Model, Item } from './model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  model = new Model()

  getName(){
    return this.model.user;
  }

  getItems(){
    return this.model.items.filter(item => !item.done);
  }

  addTodoItem(itemName){
    if(itemName != ''){
      this.model.items.push(new Item(itemName, false));
    }
  }
}
