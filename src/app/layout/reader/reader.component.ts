import { Component, OnInit } from '@angular/core';
import { ReaderService } from './reader.service';

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.scss']
})
export class ReaderComponent implements OnInit {

  constructor(private readerService: ReaderService) { }

  pageData: any;
  ngOnInit(): void {
    this.readerService.getData().subscribe(data => {
      this.pageData = data;
    })
  }

}
