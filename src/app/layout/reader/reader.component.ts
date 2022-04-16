import { Component, OnInit } from '@angular/core';
import { ReaderService } from './reader.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageObject } from './objects/imageObject';
import { TagObject } from './objects/TagObject';

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.scss']
})
export class ReaderComponent implements OnInit {
  closeResult: string;
  tagString: string;
  imageString: string;
  images: ImageObject[] = [];
  tags: TagObject[] = [];

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

  insertTag(tag:TagObject)
  {
    let duplicate: boolean=false;
    for(let i=0;i<this.tags.length;i++)
    {
      if(this.tags[i].tagName == tag.tagName)
      {
        duplicate=true;
      }
    }
    if(duplicate == false)
    {
      this.tags.push(tag);
    }
  }

  removeTag(i:number, j:number)
  {
    console.log("number"+j);
    this.images[i].tags.splice(j,1);
  }

  insertImage(image:ImageObject)
  {
    let duplicate: boolean=false;
    for(let i=0;i<this.images.length;i++)
    {
      if(this.images[i].imageUrl == image.imageUrl)
      {
        duplicate=true;
      }
    }
    if(duplicate == false)
    {
      this.images.push(image);
    }
  }

  setGlobalTags()
  {
    let tagNames: string[]=this.tagString.split(" ");
    tagNames = [ ...new Set(tagNames) ]
    for(let tagName of tagNames)
    {
      let tag: TagObject = {
        tagName: '',
        tagType: ''
      };
      tag.tagName=tagName;
      tag.tagType="descriptor";
      if(tag.tagName != '')
      {
        this.insertTag(tag);
      }
      // this.tags.push(tag);
    }
  }

  populateImages()
  {
    let imageNames: string[]=this.imageString.split("!||!");
    imageNames = [ ...new Set(imageNames) ];
    for(let imageName of imageNames)
    {
      let image: ImageObject = {
        imageUrl: '',
        tags: []
      };
      image.imageUrl=imageName;
      image.tags=this.tags.slice(0);
      if(image.imageUrl != '')
      {
        console.log(this.tags);
        this.insertImage(image);
      }
      // this.images.push(image);
      this.images = [ ...new Set(this.images) ];
    }
    console.log(this.images);
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
