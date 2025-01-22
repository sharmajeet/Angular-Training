import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from './user.service';

@Component({
  selector: 'app-post-api',
  imports: [FormsModule, CommonModule ],
  templateUrl: './post-api.component.html',
  styleUrl: './post-api.component.css',
})
export class PostApiComponent implements OnInit {
  UserList: any[] = [];
  http = inject(HttpClient);

  //injecting services
  constructor(private Service : UserService) { }

  PostObj: any = {
    id: 0,
    userid: 0,
    title: '',
    body: '',
  };

  data: any;
  Id: number = 0;

  ngOnInit(): void {
    this.getAllUser();
  }

  // onSave() {
  //   this.http.post('https://jsonplaceholder.typicode.com/posts', this.PostObj).subscribe((res) => {
  //     this.data = res;
  //     console.log(res);
  //     if (this.data.userId !== '' && this.data.title !== '' && this.data.body !== '') {
  //       alert('Data Inserted Successfully');
  //       this.getAllUser();
  //       this.ResetForm();
  //     }
  //   });
  // }

  //post api using services
  onSave(){
    this.Service.postUser(this.PostObj).subscribe((res:any)=>{
      this.data = res;
      console.log(res);
      if (this.data.userId!== '' && this.data.title!== '' && this.data.body!== '') {
        alert('Data Inserted Successfully');
        this.getAllUser();
        this.ResetForm();
      }
    });
  }
  ResetForm() {
    this.PostObj.id = 0;
    this.PostObj.userId = '';
    this.PostObj.title = '';
    this.PostObj.body = '';
  }

  // getAllUser() {
  //   this.http.get('https://jsonplaceholder.typicode.com/posts').subscribe((res: any) => {
  //     this.UserList = res;
  //   });
  // }

  //get api-using services
  getAllUser () 
  {
    this.Service.getUsers().subscribe((res:any)=>{
      this.UserList = res;
    });
  }
  // Edit form - PUT API
  onEdit(data: any) {
    this.PostObj = data;
  }

  // onUpdate(PostObj: any) {
  //   debugger;
  //   this.Id = PostObj.id; // Get the ID of the post
  //   this.http.put(`https://jsonplaceholder.typicode.com/posts/${this.Id}`, this.PostObj).subscribe((res) => {
  //     this.data = res;
  //     console.log(res);
  //     if (this.data.userid !== '' && this.data.title !== '' && this.data.body !== '') {
  //       alert('Data Updated Successfully');
  //       this.getAllUser();
  //       this.ResetForm();
  //     }
  //   });
  // }

    //put api using service
    onUpdate(PostObj:any){
      this.Service.putUser(PostObj).subscribe((res:any)=>{
        this.data = res;
        console.log(res);
        if (this.data.userId!== '' && this.data.title!== '' && this.data.body!== '') {
          alert('Data Updated Successfully');
          this.getAllUser();
          this.ResetForm();
        }
      });
    }
  
  // Delete API
  // onDelete(id: number) {
  //   const isDelete = confirm('Do you want to delete?');
  //   if(isDelete) {
  //   this.http.delete(`https://jsonplaceholder.typicode.com/posts/${id}`).subscribe((res) => {
  //     this.data = res;
  //     console.log(res);
  //     alert('Data Deleted Successfully');
  //     this.getAllUser();
  //   });
  //   }
  // }

  //Delete api using services
  onDelete(id:number){
    this.Service.deleteUser(id).subscribe((res:any)=>{
      this.data = res;
      console.log(res);
      alert('Data Deleted Successfully');
      this.getAllUser();
    });
  }
}
