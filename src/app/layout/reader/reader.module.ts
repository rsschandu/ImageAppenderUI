import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReaderRoutingModule } from './reader-routing.module';
import { ReaderComponent } from './reader.component';
import { HttpClientModule } from '@angular/common/http';
import { SafePipeModule } from 'safe-pipe';


@NgModule({
  declarations: [
    ReaderComponent
  ],
  imports: [
    CommonModule,
    ReaderRoutingModule,
    HttpClientModule,
    SafePipeModule
  ]
})
export class ReaderModule { }
