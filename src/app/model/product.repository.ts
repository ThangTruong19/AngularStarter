import { Injectable } from "@angular/core";
import { Product } from "./product.model";
import { RestDataSource } from "./rest.datasource";

@Injectable()
export class ProductRepository{
    private products: Product[] = [];
    private categories: string[] = [];

    constructor(private dataSource: RestDataSource){
        dataSource.getProducts().subscribe(data => {
            this.products = data;
            this.categories = data.map(p => p.category)
                                  .filter((item,index,array) => array.indexOf(item) == index).sort();
        })
    }

    getProducts(category: string = null): Product[]{
        if(category == null){
            return this.products;
        }else{
            return this.products.filter(product => product.category == category);
        }
    }

    getCategories(): string[]{
        return this.categories;
    }

    getProduct(id: number): Product{
        return this.products.find(product => product.id == id);
    }

    saveProduct(product: Product){
        if(product.id == null || product.id == 0){
            this.dataSource.saveProduct(product).subscribe(p => {
                this.products.push(p);
            })
        }else{
            this.dataSource.updateProduct(product).subscribe(p => {
                this.products.splice(this.products.findIndex(p => p.id == product.id),1,product);
            })
        }
    }

    deleteProduct(id: number){
        this.dataSource.deleteProduct(id).subscribe(p => {
            this.products.splice(this.products.findIndex(p => p.id == id),1);
        })
    }
}