import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReaderService {

  constructor(private httpClient: HttpClient) { }
  url: string;
  getData() {
    if(this.url != undefined || this.url != null )
    {
      return this.httpClient.get("http://localhost:8080/image-appender/home/getData?url="+this.url);
    }
  }

  setUrl(url: string)
  {
    this.url=url;
  }
}
