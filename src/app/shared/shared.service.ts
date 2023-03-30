import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class SharedService {

    constructor(private http: HttpClient) {
    }

    subscription(data:any){
        return this.http.post(`${environment.Main_Api}subscription`, data)
    }

    getAllBlog(){
        return this.http.get(`${environment.Main_Api}blog/get-all`)
    }

    getAllBlogById(id:any){
        return this.http.get(`${environment.Main_Api}blog/getById/${id}`)
    }

}