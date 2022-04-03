import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
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
        //this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
        this.baseUrl = "/api/";
    }

    getProducts(): Observable<Product[]>{
        return this.httpClient.get<Product[]>(this.baseUrl + 'products');
    }

    saveProduct(product: Product): Observable<Product>{
        return this.httpClient.post<Product>(this.baseUrl + "products",product,this.getOpitons());
    }

    updateProduct(product: Product): Observable<Product>{
        return this.httpClient.put<Product>(this.baseUrl + "products/" + `${product.id}`,product,this.getOpitons());
    }

    deleteProduct(id: number): Observable<Product>{
        return this.httpClient.delete<Product>(this.baseUrl + "products/" + `${id}`,this.getOpitons());
    }

    saveOrder(order:Order){
        this.httpClient.post<Order>(this.baseUrl + "orders",order);
    }

    getOrders(): Observable<Order[]>{
        return this.httpClient.get<Order[]>(this.baseUrl + "orders",this.getOpitons());
    }

    updateOrder(order: Order): Observable<Order>{
        return this.httpClient.put<Order>(this.baseUrl + "orders" + `${order.id}`,order,this.getOpitons());
    }

    deleteOrder(id: number): Observable<Order>{
        return this.httpClient.delete<Order>(this.baseUrl + "orders" + `${id}`,this.getOpitons());
    }

    authenticate(user: string, pass: string): Observable<Boolean>{
        return this.httpClient.post<any>(this.baseUrl + "login",{
            name: user, password: pass
        }).pipe(map(response =>{
            this.auth_token = response.token;
            return response.success;
        }))
    }

    private getOpitons(){
        return {
            headers: new HttpHeaders({
                "Authorization": `Bearer<${this.auth_token}>`
            })
        }
    }
}