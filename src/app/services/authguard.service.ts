import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { NetworkService } from "./network.service";
import { UtilityService } from './utility.service'

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router,
        private networkService: NetworkService,
        private utilityService: UtilityService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.utilityService.getResult().status) {
            return true;
        }

        this.router.navigate(['']);
        return false;
    }
}