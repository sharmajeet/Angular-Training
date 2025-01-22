import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertComponent } from '../../Reusable/alert/alert.component';
import { MyButtonComponent } from '../../Reusable/my-button/my-button.component';
@Component({
  selector: 'app-api-integration',
  imports: [AlertComponent , MyButtonComponent],
  templateUrl: './api-integration.component.html',
  styleUrl: './api-integration.component.css'
})
export class ApiIntegrationComponent {

  UserList : any[] = [];
  ProductList : any[] = [];


  //function of Output method
  getData(data: any)
  {
    alert(data);
  }
  // //in use after angular.16 update
  http = inject(HttpClient);

    //default methdod for the api call
  // constructor(private http: HttpClient)
  // {
    // this.http.get("https://jsonplaceholder.typicode.com/users").subscribe((res: any) => {
    //   debugger;
    //   this.UserList = res;
    //   });
  // }

  getAllUser()
  {
    debugger;
    this.http.get("https://jsonplaceholder.typicode.com/users").subscribe((res: any) => {
      debugger;
      this.UserList = res;
      });
  }

  getAllProduct()
  {
    this.http.get("https://dummyjson.com/products").subscribe((result:any)  => {
      this.ProductList = result.products;
    });
  }

}
