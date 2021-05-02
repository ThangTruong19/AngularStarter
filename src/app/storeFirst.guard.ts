import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { StoreComponent } from "./store/store.component";

@Injectable()
export class StoreFirstGuard implements CanActivate{

    private firstNavigate = true;
    constructor(private router: Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if(this.firstNavigate){
            this.firstNavigate = false;
            if(route.component != StoreComponent){
                this.router.navigateByUrl('/');
                return false;
            }
        }
        return true;
    }
    
}