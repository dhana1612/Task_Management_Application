import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {taskModel } from '../../Model/Task_Model';
import { TaskServiceService } from '../../task-service.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-task',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent implements OnInit {

  constructor(private taskService : TaskServiceService){}

  ngOnInit() {
    this.GetAllTasks()
  }

//ReactiveFormModel
  formDetails = new FormGroup(
    {
      id : new FormControl(0),
      title : new FormControl(''),
      description : new FormControl(''),
      status :new FormControl('Pending')
    }
  )

//Variable
  taskDetails : taskModel[] = []
  filteredTasks: taskModel[] =[]
  sendDetails : any
  visible : boolean = true;
  formVisible :boolean = false;
  editMode :boolean = false;
  searchText: string = '';
  selectedStatus :string ="";
  successMessage: string = '';
  errorMessage : string = "";




//Display all details
  GetAllTasks(){
    this.taskService.GetAllTasks().subscribe(
      {
        next : response =>{
          this.taskDetails = response
          this.filteredTasks = response
        },
        error : errResponse =>{
          this.errorMsg(errResponse)
        }

      }
    )
  }

//Delete the task
  confirmDelete(id :number){
    const result = window.confirm("Are you sure you want to delete this task?");
    if (result) {
      this.DeleteTask(id);
    }
  }

  DeleteTask(id :number){
    this.taskService.DeleteTask(id).subscribe(
      {
        next : response => {
          this.successMsg(response)
          this.GetAllTasks()
        },
        error : errResponse =>{
          this.errorMsg(errResponse)
        }
      }
    )
  }

//Add Button
  addTaskBtn(){
    this.visible = false
    this.formVisible = true
  }

//Edit Button
  editBtn(task :taskModel){
    this.editMode = true;
    this.visible=false;
    this.formVisible = true
    this.formDetails.setValue({
      id : task.id,
      title : task.title,
      description : task.description,
      status : task.status
    })

  }

//Close Button
  closeBtn(){
    this.visible = true
    this.formVisible = false
    this.editMode = false;
    this.formReset()
  }

//Decision Making   
  decisionMode(){
    if(!this.editMode){
      this.createTask();
    }
    else{
      this.updateTask()
    }
  }

// Add New Task
  createTask()
  {
    this.sendDetails = this.formDetails.value
    this.taskService.CreateTask(this.sendDetails).subscribe(
      {
        next : res => {
            this.successMsg(res)
            this.GetAllTasks()
            this.formReset()
            this.sendDetails = null;
            this.formVisible = false;
            this.visible = true
          },
          error : err =>{
            this.errorMsg(err)
          }
      }
    )
  }

//Update Task
  updateTask(){
    this.sendDetails = this.formDetails.value
          this.taskService.UpdateTask(this.sendDetails.id,this.sendDetails,).subscribe(
        {
          next : res => {
            this.successMsg(res)
            this.GetAllTasks()
            this.formReset()
            this.formVisible = false;
            this.visible = true
            this.sendDetails = null;
          },
          error : err =>{
            this.errorMsg(err)
          }
        }
      )
  }

//Form Reset
  formReset(){
    this.formDetails.setValue({
              id : 0,
              title : "",
              description : "",
              status : "Pending"
            })
  }

//Filter 
  filterTasks(){
    const search = this.searchText.trim().toLowerCase();
    const status = this.selectedStatus;

    this.filteredTasks = this.taskDetails.filter((task: taskModel) => {
    const matchesTitle = task.title?.toLowerCase().includes(search);
    const matchesStatus = status === '' || task.status === status;
    return matchesTitle && matchesStatus;
  });

  }

  successMsg(message: string) {
    this.successMessage = message;
    setTimeout(() => {
      this.successMessage = '';
    }, 3000); 
  }

  errorMsg(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000); 
  }

}
  
