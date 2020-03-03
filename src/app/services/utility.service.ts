import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Planet } from '../models/planets.model';
import { Vehicle } from '../models/vehicles.model';
import { Subject, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { NetworkService } from './network.service';

@Injectable({
    providedIn: 'root'
})
export class UtilityService {

    selectedPlanets: Planet[] = [];
    selectedVehicles: Vehicle[] = [];

    planetList: Planet[];
    vehicleList: Vehicle[];

    timeTaken: number[] = [];

    result: any = {};

    headers: HttpHeaders;

    constructor(private http: HttpClient) {
        this.planetList = [];
        this.vehicleList = [];

        this.headers = new HttpHeaders().append("Accept", "application/json").append("Content-Type", "application/json");
    }

    setPlanetList(pList: Planet[]) {
        this.planetList = pList;
        localStorage.setItem("planets", JSON.stringify(pList));
    }

    getPlanetList() {
        let planetList: Planet[] = JSON.parse(localStorage.getItem("planets"));
        return planetList;
    }

    setSelectedPlanetList(planets) {
        this.planetList = planets;
    }

    getSelectedPlanetList() {
        this.selectedPlanets = this.planetList.filter((item) => {
            return item.isSelected === true;
        });
        return this.selectedPlanets;
    }

    setVehicleList(vList: Vehicle[]) {
        this.vehicleList = vList;
        localStorage.setItem("vehicles", JSON.stringify(vList));
    }

    getVehicleList() {
        let vehicleList: Vehicle[] = JSON.parse(localStorage.getItem("vehicles"));
        return vehicleList;
    }

    findFlacone(data) {
        return this.http.post<string>(environment.tokenUrl, null, { headers: this.headers }).pipe(mergeMap(token => this.find(token, data)))
    }

    find(token: any, data) {
        let body = {
            "token": token.token,
            "planet_names": data.planets,
            "vehicle_names": data.vehicles
        }
        return this.http.post<any>(environment.findUrl, body, { headers: this.headers });
    }

    resetEverything() {
        this.planetList = [];
        this.selectedPlanets = [];
        this.selectedVehicles = [];
        this.timeTaken = [];
        this.result = {};
        return "done";
    }

    setTimeTaken(total_time) {
        this.timeTaken = total_time; 
    }

    setResult(res: any) {
        this.result = res;
        this.result["timeTaken"] = this.timeTaken;
    }

    getResult() {
        return this.result;
    }

}