import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ImageObject } from '../reader/objects/imageObject';
import { TagObject } from '../reader/objects/TagObject';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor(private httpClient: HttpClient) { }
  baseUrl: string= "http://localhost:8080/image-appender/";
  getImages(tagString): Observable<ImageObject[]> {
    if(tagString != undefined )
    {
      return this.httpClient.get<ImageObject[]>(this.baseUrl+"images?tags="+tagString);
    }
  }

  postImages(images: ImageObject[])
  {
    if(images.length>0)
    {
      return this.httpClient.post(this.baseUrl+"images/",images);
    }
  }

  deleteImage(imageId: number)
  {
    if(imageId != undefined || imageId != null)
    {
      return this.httpClient.get(this.baseUrl+"images/delete?imageId="+imageId)
    }
  }

}
