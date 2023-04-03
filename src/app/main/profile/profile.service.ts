import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ProfileService {

    constructor(private http: HttpClient) {
    }

    getUserDetails(id:any){
        return this.http.get(`${environment.Main_Api}user/getById/${id}`)
    }

    createblog(data:any){
        return this.http.post(`${environment.Main_Api}blog`, data)
    }

    deleteblog(id:any){
        return this.http.delete(`${environment.Main_Api}blog/delete/${id}`)
    }

    GetAllblogByUser(data:any){
        return this.http.get(`${environment.Main_Api}blog/getByUser/${data}`)
    }

    createbooking(data:any){
        return this.http.post(`${environment.Main_Api}booking`, data)
    }

    deletebooking(id:any){
        return this.http.delete(`${environment.Main_Api}booking/delete/${id}`)
    }

    GetAllbookingByUser(data:any){
        return this.http.get(`${environment.Main_Api}booking/getByUser/${data}`)
    }

    createenquiry(data:any){
        return this.http.post(`${environment.Main_Api}query`, data)
    }

    deleteenquiry(id:any){
        return this.http.delete(`${environment.Main_Api}query/delete/${id}`)
    }

    GetAllenquiryByUser(data:any){
        return this.http.get(`${environment.Main_Api}query/getByUser/${data}`)
    }

    


}