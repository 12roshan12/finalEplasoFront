import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class TripService {

    constructor(private http: HttpClient) {
    }

    uploadPhoto(data: any) {
        return this.http.post(`${environment.Main_Api}media/upload`, data)
    }

    createBooking(data:any){
        return this.http.post(`${environment.Main_Api}booking`, data)
    }

    getBookingByUser(user:any){
        return this.http.get(`${environment.Main_Api}booking/${user}`, )
    }

    deleteBooking(id:any){
        return this.http.delete(`${environment.Main_Api}booking/${id}`, )
    }

    createEnquiry(data:any){
        return this.http.post(`${environment.Main_Api}query`, data)
    }

    getEnquiryByUser(user:any){
        return this.http.get(`${environment.Main_Api}query/${user}`)
    }

    deleteEnquiry(id:any){
        return this.http.delete(`${environment.Main_Api}query/${id}`)
    }

    getAllTrip(){
        return this.http.get(`${environment.Main_Api}trip/get-all`)
    }

    getAllCategory(){
        return this.http.get(`${environment.Main_Api}category/get-all`)
    }

    getTripById(id:any){
        return this.http.get(`${environment.Main_Api}trip/get-trip/${id}`)
    }

    postReview(data:any){
        return this.http.post(`${environment.Main_Api}trip/post-comment`, data)
    }

   

}