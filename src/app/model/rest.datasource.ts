import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Product } from "./product.model";
import { Order } from "./order.model";
import { map } from "rxjs/operators"

const PROTOCOL = "http";
const PORT = 3500;

@Injectable()
export class RestDataSource{
    baseUrl: string;
    auth_token: string;

    constructor(private httpClient: HttpClient){
        this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
    }

    getProducts(): Observable<Product[]>{
        return this.httpClient.get<Product[]>(this.baseUrl + 'products');
    }

    saveOrder(order:Order){
        this.httpClient.post<Order>(this.baseUrl + "orders",order);
    }

    authenticate(user: string, pass: string): Observable<Boolean>{
        return this.httpClient.post<any>(this.baseUrl + "login",{
            name: user, password: pass
        }).pipe(map(response =>{
            this.auth_token = response.token;
            return response.success;
        }))
    }
}