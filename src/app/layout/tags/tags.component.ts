import { Component, OnInit } from '@angular/core';
import { TagObject } from '../reader/objects/TagObject';
import { TagsService } from './tags.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {
  tagString: string = '';
  tags: TagObject[] = [];
  tagTypes: string[] = ['core', 'descriptor'];

  constructor(private tagsService: TagsService) { }

  ngOnInit(): void {
  }

  searchTags(){
    this.tagsService.searchTags(this.tagString).subscribe(data => {
      this.tags=data;
      console.log(data);
    })
  }
  
  saveTag(tag: TagObject){
    this.tagsService.saveTag(tag).subscribe(data => {
      this.searchTags();
    })
  }

  deleteTag(tagId: number){
    this.tagsService.deleteTag(tagId).subscribe(data => {
      this.searchTags();
    })
  }


}
