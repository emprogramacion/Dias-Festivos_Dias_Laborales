import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Ejercicio1Page } from './ejercicio1.page';

const routes: Routes = [
  {
    path: '',
    component: Ejercicio1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Ejercicio1PageRoutingModule {}
