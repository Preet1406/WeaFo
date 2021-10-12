import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ForecastService {

  constructor(private http: HttpClient) { }
  getWeatherForecast(){
    return new Observable((observer) =>
    navigator.geolocation.getCurrentPosition(
      (position) =>{
        observer.next(position)
      },
      (error) =>{
        observer.next(error)
      }
    )).pipe(
      map((value:any) => {
        return new HttpParams()
        .set('lon', value.coords.longitude)
        .set('lat', value.coords.latitude)
        .set('units', 'imperial')
        .set('appid', '38edf414113f0f0700739afb7b7b5805')
      }),
      switchMap((values) =>{
        return this.http.get('https://api.openweathermap.org/data/2.5/forecast', {params: values})
      })
    )
  }
  another_city(city: any){
    let params = new HttpParams()
    .set('lat',city.coords.latitude)
    .set('lon', city.coords.longitude)
    .set('units', 'imperial')
    .set('appid', '38edf414113f0f0700739afb7b7b5805')

    return this.http.get('https://api.openweathermap.org/data/2.5/forecast', {params});
  }
}

