import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Product } from "./product.model";
import { Order } from "./order.model";

const PROTOCOL = "http";
const PORT = 3500;

@Injectable()
export class RestDataSource{
    baseUrl: string;

    constructor(private httpClient: HttpClient){
        this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
    }

    getProducts(): Observable<Product[]>{
        return this.httpClient.get<Product[]>(this.baseUrl + 'products');
    }

    saveOrder(order:Order){
        this.httpClient.post<Order>(this.baseUrl + "orders",order);
    }
}