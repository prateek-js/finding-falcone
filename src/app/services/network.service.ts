import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Planet } from '../models/planets.model';
import { Vehicle } from '../models/vehicles.model';

import { HttpHeaders } from '@angular/common/http';
import { map, catchError, retry, mergeMap } from 'rxjs/operators';
import { ObserveOnOperator } from 'rxjs/internal/operators/observeOn';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  private tokenUrl = "https://findfalcone.herokuapp.com/token";
  private planetsUrl = "https://findfalcone.herokuapp.com/planets";
  private vehiclesUrl = "https://findfalcone.herokuapp.com/vehicles";
  private findFalconeUrl = "https://findfalcone.herokuapp.com/find";

  private httpOptions = {
    headers: new HttpHeaders({
      Accept: "application/json"
    })
  };

  constructor(private http: HttpClient) { }

  getToken(): Observable<any> {
    return this.http.post<string>(environment.tokenUrl, "", this.httpOptions).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  getPlanetsData() : Observable<Planet[]>{
    return this.http.get<Planet[]>(environment.planetUrl)
    .pipe(
      retry(2),
      map(response => {
        return response;
      }),
      catchError(_ => {
        return new Observable<Planet[]>(observer => {
          observer.next([
            {"name":"Donlon","distance":100},
            {"name":"Enchai","distance":200},
            {"name":"Jebing","distance":300},
            {"name":"Sapir","distance":400},
            {"name":"Lerbin","distance":500},
            {"name":"Pingasor","distance":600}
          ]);
          observer.complete();
        });
      })
    );
  }

  getVehiclesData() : Observable<Vehicle[]>{
    return this.http.get<Vehicle[]>(environment.vehicleUrl)
      .pipe(
        retry(2),
        map(response => {
          return response;
        }),
        catchError(_ => {
          return new Observable<Vehicle[]>(observer => {
            observer.next([
              {"name":"Space pod","total_no":2,"max_distance":200,"speed":2},
              {"name":"Space rocket","total_no":1,"max_distance":300,"speed":4},
              {"name":"Space shuttle","total_no":1,"max_distance":400,"speed":5},
              {"name":"Space ship","total_no":2,"max_distance":600,"speed":10}
            ]);
            observer.complete();
            
          });
        })
      );
  }

  findFlacone(body: any) : Observable<any> {
    let token = this.getToken();
    body.token = token;
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'
      })
    };
    return this.http.post(this.findFalconeUrl, body, httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = "";
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${
        err.message
      }`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
