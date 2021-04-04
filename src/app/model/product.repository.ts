import { Injectable } from "@angular/core";
import { Product } from "./product.model";
import { StaticDataSource } from "./static.datasource";

@Injectable()
export class ProductRepository{
    private products: Product[] = [];
    private categories: string[] = [];

    constructor(private dataSource: StaticDataSource){
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
}