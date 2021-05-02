import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Order } from "../model/order.model";
import { OrderRepository } from "../model/order.repository";

@Component({
    templateUrl: 'checkout.component.html',
    styleUrls: ['checkout.component.css']
})
export class CheckoutComponent{
    orderSent: boolean = false;
    submitted: boolean = false;

    constructor(private repository: OrderRepository, public order: Order){}

    submitOrder(form: NgForm){
        this.submitted = true;

        if(form.valid){
            this.repository.saveOrder(this.order);
            this.orderSent = true;
            this.order.clear();
            this.submitted = false;
        }
    }
}