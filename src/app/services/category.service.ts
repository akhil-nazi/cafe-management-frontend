import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  url = environment.apiUrl
  constructor(private httpclient: HttpClient) { }
  add(data: any){
    return this.httpclient.post(this.url+"/category/post/",data,{
      headers: new HttpHeaders().set('Content-Type','application/json')
    })
  }

  update(data: any){
    return this.httpclient.patch(this.url+"/category/update/",data,{
      headers: new HttpHeaders().set('Content-Type','application/json')
    })
  }

getcategory(data:any){
  return this.httpclient.get(this.url+"/category/categories/")
}
}
