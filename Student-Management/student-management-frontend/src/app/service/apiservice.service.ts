import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(private _http:HttpClient) { }

  //Connect frontend to backend
  apiUrl = 'http://localhost:3000/user';

  //get active data
  getAllData():Observable<any>
  {
    return this._http.get(`${this.apiUrl}`);
  }

  //get total Data
  getTotalData() {
    let options = { params: new HttpParams().set("total", "0") };
    return this._http.get(this.apiUrl, options);
  }

  //create data
  createData(data:any):Observable<any>
  {
    console.log(data,'createapi=>');
    return this._http.post(`${this.apiUrl}`,data);
  }

  //update data
  updateData(data:any,studentId:any):Observable<any>
  {
    let id = studentId;
    return this._http.put(`${this.apiUrl}/${id}`,data);
  }

  // get single data
  getSingleData(studentId:any):Observable<any>
  {
    console.log(studentId,'getSingleData=>');
    let id = studentId;
    return this._http.get(`${this.apiUrl}/${id}`);
  }

  //deactivated
  patchData(data:any,studentId:any):Observable<any>
  {
    let id = studentId;
    return this._http.patch(`${this.apiUrl}/${id}`,data);
  }

}
