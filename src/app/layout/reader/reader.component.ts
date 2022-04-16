import { Component, OnInit } from '@angular/core';
import { ReaderService } from './reader.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.scss']
})
export class ReaderComponent implements OnInit {
  closeResult: string;
  tagString: string;

  constructor(private readerService: ReaderService,private modalService: NgbModal) { }

  pageData: any;
  ngOnInit(): void {
    this.getPageData();
  }

  getPageData() {
    if(this.readerService.url != undefined || this.readerService.url != null)
    {
      this.readerService.getData().subscribe(data => {
        this.pageData = data;
      })
    }
  }

  open(content) {
    this.modalService.open(content, { windowClass: "image-modal-class" }).result.then(
        (result) => {
            this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
    );
  }

  searchGoogle(tagString: string)
  {
    window.open('https://www.google.com/search?tbm=isch&q='+tagString);
  }

  saveImages(){
    console.log("save Images");
  }

  private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
  } else {
      return `with: ${reason}`;
  }
}

}
