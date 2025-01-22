import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) { }

  getUsers(){
    return this.http.get("https://jsonplaceholder.typicode.com/posts");
  }

  postUser(obj:any){
    return this.http.post("https://jsonplaceholder.typicode.com/posts", obj);
  }

  putUser(obj:any)
  {
    return this.http.put("https://jsonplaceholder.typicode.com/posts/"+obj.id, obj);
  }

  deleteUser(id:number)
  {
   return this.http.delete("https://jsonplaceholder.typicode.com/posts/"+id);
  }
}
