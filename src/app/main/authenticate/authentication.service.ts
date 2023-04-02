import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class AuthentictaionService {

    constructor(private http: HttpClient) {
    }

    uploadPhoto(data: any) {
        return this.http.post(`${environment.Main_Api}media/upload`, data)
    }

    signIn(data:any){
        return this.http.post(`${environment.Main_Api}authentication/sign-in`, data)
    }

    signUp(data:any){
        return this.http.post(`${environment.Main_Api}authentication/sign-up`, data)
    }

    requestOtp(data:any){
        return this.http.post(`${environment.Main_Api}authentication/request-otp`, data)
    }

    verifyOtp(data:any){
        return this.http.post(`${environment.Main_Api}authentication/verify-otp`, data)
    }

    changePassword(data:any){
        return this.http.post(`${environment.Main_Api}authentication/change-password`, data)
    }

    // GetAllCategory(){
    //     return this.http.get(`${environment.Main_Api}category/get-all`)
    // }

    // deleteCategory(id:any){
    //     return this.http.delete(`${environment.Main_Api}category/delete/${id}`)
    // }

}