import { Component, OnInit } from '@angular/core';
import { ImageObject } from '../reader/objects/imageObject';
import { TagObject } from '../reader/objects/TagObject';
import { ImagesService } from './images.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit {
  tagString: string;
  images: ImageObject[] = [];
  tags: TagObject[] = [];
  tagsToAddString: string[] = [];

  constructor(private imagesService: ImagesService) { }

  ngOnInit(): void {
  }

  removeTag(i:number, j:number)
  {
    this.images[i].tags.splice(j,1);
  }

  deleteImage(i:number)
  {
    this.imagesService.deleteImage(i).subscribe(data => {
      this.searchImages();
    });
  }

  addTags(index:number, tagNamesString:string)
  {
    let tagNames = tagNamesString.split(",");
    tagNames = [ ...new Set(tagNames) ]
    for(let j=0;j<tagNames.length;j++)
    {
      let duplicate: boolean=false;
      for(let i=0;i<this.images[index].tags.length;i++)
      {
        if(this.images[index].tags[i].tagName == tagNames[j])
        {
          duplicate=true;
        }
      }
      if(duplicate == false)
      {
        let tag: TagObject = {
          tagName: '',
          tagType: 'descriptor'
        };
        tag.tagName=tagNames[j];
        this.images[index].tags.push(tag);
      }
    }
    this.tagsToAddString[index] = '';
  }

  saveImages(){
    this.imagesService.postImages(this.images).subscribe(data => {
      this.searchImages();
    })
  }

  searchImages(){
    this.imagesService.getImages(this.tagString).subscribe(data => {
      this.images=data;
    })
  }

}
