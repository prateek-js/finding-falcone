import { Component, OnInit } from '@angular/core';
import { UtilityService } from '../../services/utility.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html',
    styleUrls:['./header.component.scss']
})

export class HeaderComponent implements OnInit {
    constructor(private utilityService : UtilityService, private router : Router) { }

    ngOnInit() { }

    resetEverything(){
        this.utilityService.resetEverything();
        this.router.navigate([""]);
    }
}