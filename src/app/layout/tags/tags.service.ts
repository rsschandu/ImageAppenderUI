import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TagObject } from '../reader/objects/TagObject';

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  baseUrl: string= "http://localhost:8080/image-appender/";
  constructor(private httpClient: HttpClient) { }
  searchTags(tagString: string)
  {
    return this.httpClient.get<TagObject[]>(this.baseUrl+"tags?tagName="+tagString);
  }

  saveTag(tag: TagObject)
  {
    return this.httpClient.post(this.baseUrl+"tags/save",tag);
  }

  deleteTag(tagId: number)
  {
    return this.httpClient.get(this.baseUrl+"tags/delete?tagId="+tagId);
  }
}
