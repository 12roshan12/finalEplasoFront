import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class LandingService {

    constructor(private http: HttpClient) {
    }

    getAllTrip(){
        return this.http.get(`${environment.Main_Api}trip/get-all`)
    }

    getAllBlog(){
        return this.http.get(`${environment.Main_Api}blog/get-all`)
    }

    GetAllnotice(){
        return this.http.get(`${environment.Main_Api}notice/get-all`)
    }

    GetAllCategory(){
        return this.http.get(`${environment.Main_Api}category/get-all`)
    }

    getMasterData(agencyCode:any){
        return this.http.get(`${environment.Main_Api}master/${agencyCode}`)
    }


}