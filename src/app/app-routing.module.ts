import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodayComponent } from './today/today.component';
import { FutureComponent } from './future/future.component';
import { ChartComponent } from './chart/chart.component';

const routes: Routes = [
  {path: 'search/:searchTerm', component: TodayComponent},
  {path: 'search/:searchTerm', component: FutureComponent},
  {path: 'search/:searchTerm', component: ChartComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
