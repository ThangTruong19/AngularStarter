import { Component } from "@angular/core";
import { Order } from "../model/order.model";
import { OrderRepository } from "../model/order.repository";

@Component({
    templateUrl: "orderTable.component.html"
})
export class OrderTableComponent{
    includeShipped: boolean = false;

    constructor(private repository: OrderRepository){}

    getOrders(): Order[]{
        return this.repository.getOrders().filter(order => this.includeShipped || !order.shipped);
    }

    markShipped(order: Order){
        order.shipped = true;
        this.repository.updateOrder(order);   
    }

    delete(id: number){
        this.repository.deleteOrder(id);
    }
}