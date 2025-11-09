import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { taskModel } from './Model/Task_Model';



@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {

  constructor(private http :HttpClient) { }

  private apiUrl = "https://localhost:7177/api/Tasks";

  GetAllTasks() :Observable<taskModel[]>{
    return this.http.get<taskModel[]>(`${this.apiUrl}/GetAllTasks`);
  }

  DeleteTask(id :number) :Observable<string>{
    return this.http.delete(`${this.apiUrl}/DeleteTask/${id}`, { responseType: 'text' });
  }

  CreateTask(task : taskModel) :Observable<string>{
    console.log(task)
    return this.http.post(`${this.apiUrl}/CreateTask`, task,{ responseType: 'text' })
  }

  UpdateTask(id:number, task :taskModel) : Observable<string>{
    return this.http.put(`${this.apiUrl}/UpdateTask/${id}`, task ,{ responseType: 'text' })
  }

}
