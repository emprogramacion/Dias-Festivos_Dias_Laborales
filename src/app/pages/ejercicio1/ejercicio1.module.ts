import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Ejercicio1PageRoutingModule } from './ejercicio1-routing.module';

import { Ejercicio1Page } from './ejercicio1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ejercicio1PageRoutingModule
  ],
  declarations: [Ejercicio1Page]
})
export class Ejercicio1PageModule {}
