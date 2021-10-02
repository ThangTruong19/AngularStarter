import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../model/auth.service";

@Component({
    templateUrl: 'auth.component.html'
})
export class AuthComponent{
    private username: string;
    private password: string;
    public errorMessage: string;

    constructor(private router: Router, private authService: AuthService){}

    authenticate(form: NgForm){
        if(form.valid){
            this.authService.authenticate(this.username, this.password)
                .subscribe(response => {
                    if(response){
                        this.router.navigateByUrl('/admin');
                    }
                    this.errorMessage = "Authentication Failed!";
                })
            
        }else{
            this.errorMessage = 'Form data invalid';
        }
    }
}