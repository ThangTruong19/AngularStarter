import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Order } from "./order.model";
import { RestDataSource } from "./rest.datasource";

@Injectable()
export class OrderRepository{
    private loaded: boolean = false;
    public orders: Order[];

    constructor(private datasource: RestDataSource){}

    getOrders(): Order[]{
        if(!this.loaded){
            this.loadOrders();
        }
        return this.orders;
    }

    saveOrder(order: Order){
        this.datasource.saveOrder(order);
    }

    loadOrders(){
        this.loaded = true;
        this.datasource.getOrders().subscribe(orders => {
            this.orders = orders;
        })
    }

    updateOrder(order: Order){
        this.datasource.updateOrder(order).subscribe(order => {
            this.orders.splice(this.orders.findIndex(o => o.id == order.id),1,order);
        })
    }

    deleteOrder(id: number){
        this.datasource.deleteOrder(id).subscribe(o => {
            this.orders.splice(this.orders.findIndex(o => o.id == id),1);
        })
    }
}