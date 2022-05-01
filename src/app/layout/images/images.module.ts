import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImagesRoutingModule } from './images-routing.module';
import { ImagesComponent } from './images.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ImagesComponent
  ],
  imports: [
    CommonModule,
    ImagesRoutingModule,
    FormsModule
  ]
})
export class ImagesModule { }
