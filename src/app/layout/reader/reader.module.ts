import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReaderRoutingModule } from './reader-routing.module';
import { ReaderComponent } from './reader.component';
import { HttpClientModule } from '@angular/common/http';
import { SafePipeModule } from 'safe-pipe';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ReaderComponent
  ],
  imports: [
    CommonModule,
    ReaderRoutingModule,
    HttpClientModule,
    SafePipeModule,
    FormsModule
  ]
})
export class ReaderModule { }
