import { Injectable } from "@angular/core";
import { Product } from "./product.model";

@Injectable()
export class Cart{
    public lines: CartLine[] = [];
    public itemCount: number;
    public totalPrice: number;

    addLine(product: Product, quantity: number){
        let line = this.lines.find(line => line.product.id == product.id);

        if(line != undefined){
            line.quantity += 1;
        }else{
            this.lines.push(new CartLine(product,quantity));
        }
        this.recalculate();
    }

    removeLine(id: number){
        let line = this.lines.find(line => line.product.id == id);

        if(line != undefined){
            this.lines.splice(this.lines.indexOf(line),1);
        }
        this.recalculate();
    }

    updateQuantity(product: Product, quantity: number){
        let line = this.lines.find(line => line.product.id == product.id);

        if(line != undefined){
            line.quantity = quantity;
        }
        this.recalculate();
    }

    clear(){
        this.lines = [];
        this.itemCount = 0;
        this.totalPrice = 0;
    }

    recalculate(){
        this.itemCount = 0;
        this.totalPrice = 0;
        this.lines.forEach(item => {
            this.itemCount += item.quantity;
            this.totalPrice += (item.product.price * item.quantity);
        })
    }
}

export class CartLine{
    constructor(public product: Product, public quantity: number){}

    get lineTotal(){
        return this.product.price * this.quantity;
    }
}