import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Order } from "./order.model";
import { StaticDataSource } from "./static.datasource";

@Injectable()
export class OrderRepository{
    public orders: Order[];

    constructor(private datasource: StaticDataSource){}

    getOrders(): Order[]{
        return this.orders;
    }

    saveOrder(order: Order){
        this.datasource.saveOrder(order);
    }
}