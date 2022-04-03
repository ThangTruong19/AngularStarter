import { Component } from "@angular/core";
import { Cart } from "../model/cart.model";
import { ConnectionService } from "../model/connection.service";

@Component({
    templateUrl: 'cartDetail.component.html' 
})
export class CartDetailComponent{
    public connected: boolean = true;

    constructor(public cart: Cart, connectionService: ConnectionService){
        this.connected = connectionService.connected;
        connectionService.Changes.subscribe((state) => this.connected = state);
    }
}