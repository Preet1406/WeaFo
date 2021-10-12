import { ForecastService } from './../forecast.service';
import { Component, OnInit } from '@angular/core';
import { pluck } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-future',
  templateUrl: './future.component.html',
  styleUrls: ['./future.component.css']
})
export class FutureComponent implements OnInit {
  weatherData:any = [];
  constructor(private forecastService: ForecastService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.forecastService.getWeatherForecast().pipe(
      pluck('list')
    )
    .subscribe((data:any) =>{
      this.futureForecast(data)
    })
  }
  futureForecast(data:any){
    for(let i = 0; i < data.length; i = i + 8){
      this.weatherData.push(data[i]);
    }
    console.log(this.weatherData);
  }
}
