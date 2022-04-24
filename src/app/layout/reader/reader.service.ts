import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ImageObject } from './objects/imageObject';

@Injectable({
  providedIn: 'root'
})
export class ReaderService {

  constructor(private httpClient: HttpClient) { }
  url: string;
  baseUrl: string= "http://localhost:8080/image-appender/";
  getData() {
    if(this.url != undefined || this.url != null )
    {
      return this.httpClient.get(this.baseUrl+"home/getData?url="+this.url);
    }
  }

  postImages(images: ImageObject[])
  {
    if(images.length>0)
    {
      return this.httpClient.post(this.baseUrl+"images/",images);
    }
  }

  setUrl(url: string)
  {
    this.url=url;
  }
}
