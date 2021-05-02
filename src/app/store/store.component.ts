import { Component } from "@angular/core";
import { Route } from "@angular/router";
import { Cart } from "../model/cart.model";
import { Product } from "../model/product.model";
import { ProductRepository } from "../model/product.repository";

@Component({
    selector: 'store',
    templateUrl: 'store.component.html'
})
export class StoreComponent{

    selectedCategory: string = null;
    productPerPage = 4;
    selectedPage = 1;

    constructor(private productRepository: ProductRepository,private cart: Cart){}

    get products(): Product[]{
        return this.productRepository.getProducts(this.selectedCategory)
                .slice((this.selectedPage-1)*this.productPerPage, (this.selectedPage-1)*this.productPerPage + this.productPerPage);
    }

    get categories(): string[]{
        return this.productRepository.getCategories();
    }

    changeCategory(newCategory: string = null){
        this.selectedCategory = newCategory;
        this.selectedPage = 1;
    }

    changePage(newPage: number){
        this.selectedPage = newPage;
        this.productRepository.getProducts(this.selectedCategory)
    }

    changePageSize(newPageSize: string){
        let pageSize = Number(newPageSize);
        this.productPerPage = pageSize;
        this.selectedPage = 1;
    }

    get pageNumbers(){
        //return Array(Math.ceil(this.productRepository.getProducts(this.selectedCategory).length / this.productPerPage))
                //.fill(0).map((x,i)=> i+1)
        return Math.ceil(this.productRepository.getProducts(this.selectedCategory).length / this.productPerPage)
    }

    addProductToCart(product: Product){
        this.cart.addLine(product, 1);
    }
}