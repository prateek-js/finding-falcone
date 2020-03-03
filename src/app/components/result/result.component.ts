import { Component, OnInit } from '@angular/core';
import { UtilityService } from '../../services/utility.service';
import { NetworkService } from '../../services/network.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-result',
    templateUrl: 'result.component.html',
    styleUrls:['./result.component.scss']
})

export class ResultComponent implements OnInit {
    finalResponse : any = {};

    constructor(private utilityService : UtilityService, private router : Router) { }

    ngOnInit() { 
        this.finalResponse = this.utilityService.getResult();
    }

    resetEverything(){
        this.utilityService.resetEverything();
        this.router.navigate(["/"]);
    }
}