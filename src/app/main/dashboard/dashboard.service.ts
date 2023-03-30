import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class AdminService {

    constructor(private http: HttpClient) {
    }

    uploadPhoto(data: any) {
        return this.http.post(`${environment.Main_Api}media/upload`, data)
    }

    createCategory(data:any){
        return this.http.post(`${environment.Main_Api}category`, data)
    }

    GetAllCategory(){
        return this.http.get(`${environment.Main_Api}category/get-all`)
    }

    deleteCategory(id:any){
        return this.http.delete(`${environment.Main_Api}category/delete/${id}`)
    }

    createguidline(data:any){
        return this.http.post(`${environment.Main_Api}guidline`, data)
    }

    GetAllguidline(){
        return this.http.get(`${environment.Main_Api}guidline/get-all`)
    }

    deleteguidline(id:any){
        return this.http.delete(`${environment.Main_Api}guidline/delete/${id}`)
    }


    createTrip(data:any){
        return this.http.post(`${environment.Main_Api}trip`, data)
    }

    getAllTrip(){
        return this.http.get(`${environment.Main_Api}trip/get-all`)
    }

    getAllTripById(id:any){
        return this.http.get(`${environment.Main_Api}trip/get-trip/${id}`)
    }

    deleteTrip(id:any){
        return this.http.delete(`${environment.Main_Api}trip/delete/${id}`)
    }

    updateBooking(data:any){
        return this.http.post(`${environment.Main_Api}booking`, data)
    }

    GetAllBooking(){
        return this.http.get(`${environment.Main_Api}booking/get-all`)
    }

    deleteBooking(id:any){
        return this.http.delete(`${environment.Main_Api}booking/delete/${id}`)
    }

    updateEnquiry(data:any){
        return this.http.post(`${environment.Main_Api}query`, data)
    }

    GetAllEnquiry(){
        return this.http.get(`${environment.Main_Api}query/get-all`)
    }

    deleteEnquiry(id:any){
        return this.http.delete(`${environment.Main_Api}query/delete/${id}`)
    }

    getAllSubscriber(){
        return this.http.get(`${environment.Main_Api}subscription/get-all`)
    }

    deleteSubscriber(id:any){
        return this.http.delete(`${environment.Main_Api}subscription/delete/${id}`)
    }

    SubmitmasterDate(body:any){
        return this.http.post(`${environment.Main_Api}master`,body)
    }

    getMasterData(agencyCode:any){
        return this.http.get(`${environment.Main_Api}master/${agencyCode}`)
    }

    createblog(data:any){
        return this.http.post(`${environment.Main_Api}blog`, data)
    }

    GetAllblog(){
        return this.http.get(`${environment.Main_Api}blog/get-all`)
    }

    deleteblog(id:any){
        return this.http.delete(`${environment.Main_Api}blog/delete/${id}`)
    }

    updateUser(data:any){
        return this.http.post(`${environment.Main_Api}user/`, data)
    }

    createnotice(data:any){
        return this.http.post(`${environment.Main_Api}notice`, data)
    }

    GetAllnotice(){
        return this.http.get(`${environment.Main_Api}notice/get-all`)
    }

    deletenotice(id:any){
        return this.http.delete(`${environment.Main_Api}notice/delete/${id}`)
    }

    createUser(data:any){
        return this.http.post(`${environment.Main_Api}user`, data)
    }

    getAllUser(){
        return this.http.get(`${environment.Main_Api}user/get-all`)
    }

    getAllUserById(id:any){
        return this.http.get(`${environment.Main_Api}user/get-user/${id}`)
    }

    deleteUser(id:any){
        return this.http.delete(`${environment.Main_Api}user/delete/${id}`)
    }

}