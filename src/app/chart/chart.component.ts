import { Component, OnInit } from '@angular/core';
import { ForecastService } from './../forecast.service';
import { ActivatedRoute } from '@angular/router';
import { Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle} from 'chart.js';

Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle);

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  chart:any = [];
  constructor(private weather: ForecastService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.weather.getWeatherForecast()
    .subscribe((res:any) => {
      const temp = res['list'].map((res:any) => res.main.temp)
      const humidity = res['list'].map((res:any)=> res.main.humidity)
      const alldates = res['list'].map((res:any) => res.dt)
      console.log(alldates)

      const weatherdates :any = []
      for (let i = 0; i < alldates.length; i = i + 8){ 
        let result = alldates[i]
        let jsdate = new Date(result * 1000)
        weatherdates.push(jsdate.toLocaleTimeString('en', {month:'short', day:'numeric'}))
      }
      this.chart = new Chart('canvas',{
        
        type:'bar',
        data:{
          labels: weatherdates,
          datasets:[
            {
            label: 'Temperature',
            data: temp,
            backgroundColor: 'rgba(255, 159, 64, 0.2)',
            borderColor:'rgb(255, 159, 64)',
            borderWidth: 2
            },
            {
              label: 'Humidity',
              data: humidity,
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor:'rgb(54, 162, 235)',
              borderWidth: 1
            },
          ]
        },
       
        options:{
          plugins:{
            legend:{
              display:true,
            },
          },
          
          scales:{
            x:{
              display:true,
            },
            y:{
              display:true
            }
          },
          animation:{
            
            duration: 4000,
            easing: 'easeInOutQuint',
          }
        }
      })
    })
  }

}
