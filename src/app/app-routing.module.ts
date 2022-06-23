import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PredictorComponent } from './components/predictor/predictor.component';

const routes: Routes = [
  { path:'', component: PredictorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
