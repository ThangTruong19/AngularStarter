import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Product } from "../model/product.model";
import { ProductRepository } from "../model/product.repository";

@Component({
    templateUrl: "productEditor.component.html" 
})
export class ProductEditorComponent{
    editing: boolean = false;
    product: Product = new Product();

    constructor(private router: Router, private activatedRoute: ActivatedRoute, 
                private repository: ProductRepository){
        this.editing = activatedRoute.snapshot.params["mode"] == "edit";
        if(this.editing){
            this.product = this.repository.getProduct(activatedRoute.snapshot.params["id"]);
        }
    }

    save(form: NgForm){
        this.repository.saveProduct(this.product);
        this.router.navigateByUrl("/admin/main/products");
    }
}