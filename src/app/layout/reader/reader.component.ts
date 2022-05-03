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
  tagsToAddString: string[] = [];

  constructor(private readerService: ReaderService, private modalService: NgbModal) {
    this.readerService.customObservable.subscribe((res) => {
      this.getPageData();
    }
    );
  }


  pageData: any;
  ngOnInit(): void {
    this.getPageData();
  }

  getPageData() {
    if (this.readerService.url != undefined || this.readerService.url != null) {
      this.readerService.getData().subscribe(data => {
        this.pageData = data;
      })
    }
  }

  viewImage(imageId: number) {
    console.log("view image with id:" + imageId);
  }

  setTagType(i: number, e) {
    if (e.target.checked) {
      this.tags[i].tagType = "core"
    }
    else {
      this.tags[i].tagType = "descriptor"
    }
  }

  insertTag(tag: TagObject) {
    let duplicate: boolean = false;
    for (let i = 0; i < this.tags.length; i++) {
      if (this.tags[i].tagName == tag.tagName) {
        duplicate = true;
      }
    }
    if (duplicate == false) {
      this.tags.push(tag);
    }
  }

  removeTag(i: number, j: number) {
    this.images[i].tags.splice(j, 1);
  }

  deleteImage(i: number) {
    this.images.splice(i, 1);
  }

  addTags(index: number, tagNamesString: string) {
    let tagNames = tagNamesString.split(",");
    tagNames = [...new Set(tagNames)]
    for (let j = 0; j < tagNames.length; j++) {
      let duplicate: boolean = false;
      for (let i = 0; i < this.images[index].tags.length; i++) {
        if (this.images[index].tags[i].tagName == tagNames[j]) {
          duplicate = true;
        }
      }
      if (duplicate == false) {
        let tag: TagObject = {
          tagName: '',
          tagType: 'descriptor'
        };
        tag.tagName = tagNames[j];
        this.images[index].tags.push(tag);
      }
    }
    this.tagsToAddString[index] = '';
  }

  insertImage(image: ImageObject) {
    let duplicate: boolean = false;
    for (let i = 0; i < this.images.length; i++) {
      if (this.images[i].imageUrl == image.imageUrl) {
        duplicate = true;
      }
    }
    if (duplicate == false) {
      this.images.push(image);
    }
  }

  setGlobalTags() {
    let tagNames: string[] = this.tagString.split(" ");
    tagNames = [...new Set(tagNames)]
    for (let tagName of tagNames) {
      let tag: TagObject = {
        tagName: '',
        tagType: ''
      };
      tag.tagName = tagName;
      tag.tagType = "descriptor";
      if (tag.tagName != '') {
        this.insertTag(tag);
      }
      // this.tags.push(tag);
    }
  }

  populateImages() {
    let imageNames: string[] = this.imageString.split("!||!");
    imageNames = [...new Set(imageNames)];
    for (let imageName of imageNames) {
      let image: ImageObject = {
        imageUrl: '',
        tags: []
      };
      image.imageUrl = imageName;
      image.tags = this.tags.slice(0);
      if (image.imageUrl != '') {
        this.insertImage(image);
      }
      // this.images.push(image);
      this.images = [...new Set(this.images)];
    }
  }

  open(content) {
    this.tagString = window.getSelection().toString();
    this.modalService.open(content, { windowClass: "image-modal-class" }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  searchGoogle(tagString: string) {
    window.open('https://www.google.com/search?tbm=isch&q=' + tagString);
  }

  saveImages() {
    this.readerService.postImages(this.images).subscribe(data => { console.log("images saved successfully") });
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
