import { Component, OnInit } from '@angular/core';
import { TaskServiceService } from '../../task-service.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { taskModel } from '../../Model/Task_Model';

@Component({
  selector: 'app-task',
  imports: [CommonModule,ReactiveFormsModule, FormsModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent implements OnInit {

  constructor(private taskService :TaskServiceService){}

  ngOnInit(){
    this.GetAllTasks();
  }

  selectedStatus: string = ''; // holds dropdown filter value

  searchText: string = '';
  task1Details: taskModel[] = [];
  filteredTasks: taskModel[] = [];

  taskDetails :any;
  displaytable : boolean = false;
  disable_search_filter : boolean = true;
  formVisible : boolean = false;
  isEditMode :boolean = false;



  formDetails = new FormGroup(
    {
      id : new FormControl(),
      title : new FormControl(''),
      description : new FormControl(''),
      status :new FormControl('Pending'),
    }
  )



  addTask() {
    this.disable_search_filter = false;
    this.displaytable = false;
    this.formVisible = true;
    this.isEditMode = false;
    this.formDetails.reset({ status: 'Pending' });
  }

  close(){
    this.disable_search_filter = true;
    this.formVisible = false;
    this.displaytable =true;

  }


  createTask(){

   if (!this.isEditMode) {
      
    this.taskDetails = this.formDetails.value;
      this.taskService.CreateTask( this.taskDetails).subscribe({
        next: res => {
          console.log(res);
          this.GetAllTasks();
          this.formDetails.reset({ status: 'Pending' });
          this.disable_search_filter = true;
          this.formVisible = false;
          this.displaytable = true;
        },
          error : err =>{
            console.log(err)
          }
        }
      )

    }
    else{
      this.taskDetails = this.formDetails.value;
      console.log(this.taskDetails)

      this.taskService.UpdateTask(this.taskDetails.id,this.taskDetails,).subscribe(
        {
          next : res => {
            console.log(res) 
            this.disable_search_filter = true;
            this.formVisible = false;
            this.displaytable =true;
            this.isEditMode = false;
            this.GetAllTasks()
            this.formDetails.setValue({
              id : 0,
              title : "",
              description : "",
              status : ""
            })
          },
          error : err =>{
            console.log(err)
          }
        }
      )
    }


    
  }

  GetAllTasks(){
    this.taskService.GetAllTasks().subscribe(
      {
        next :res => {
          if(res.length >0){
            this.displaytable = true ;
            this.task1Details = res;
            this.filteredTasks = res;
          }
          else {
            this.displaytable = false ;
          }
        },
        error :err => {
          console.error('API Error:', err);
        }
      }
    );
  }


  DeleteTask(id :number){
    this.taskService.DeleteTask(id).subscribe(
      {
        next :res => {
          console.log(res)
          this.GetAllTasks()
        },
        error :err =>{
          console.error('API Error:', err);
        }
      }
    )
  }

  confirmDelete(id: number) {
    const result = window.confirm("Are you sure you want to delete this task?");
    if (result) {
      this.DeleteTask(id);
    }
  }


  EditTask(value :any){
    console.log(value)
    this.isEditMode = true;
    this.addTask()
    this.formDetails.setValue({
      id : value.id,
      title : value.title,
      description : value.description,
      status : value.status
    })
  }


filterTasks(): void {
  const search = this.searchText.trim().toLowerCase();
  const status = this.selectedStatus;

  this.filteredTasks = this.task1Details.filter((task: taskModel) => {
    const matchesTitle = task.title?.toLowerCase().includes(search);
    const matchesStatus = status === '' || task.status === status;
    return matchesTitle && matchesStatus;
  });
}

}
