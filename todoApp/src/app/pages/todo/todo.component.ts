import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormValidationService } from 'src/app/services/form-validator/form-validation.service';
import { WidgetService } from 'src/app/services/widget/widget.service';
import { ITask } from 'src/app/utils/models/task.model';

@Component({
    selector: 'app-todo',
    templateUrl: './todo.component.html',
    styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

    task!: FormGroup;

    tasks: any;

    todoData!: ITask[];
    onDoingData!: ITask[];
    doneData!: ITask[];

    constructor(
        private fb: FormBuilder,
        private formValidationService: FormValidationService,
        private widget: WidgetService
    ) {
        this.initData()
        this.initForm();
    }

    ngOnInit(): void { }

    initData(){
        let d = localStorage.getItem('data') || '' ;
        this.tasks = JSON.parse(d);
        this.todoData = this.tasks.todo;
        this.onDoingData = this.tasks.ondoing;
        this.doneData = this.tasks.done;
    }

    initForm(){
        this.task = this.fb.group({
            task: [
                '', 
                Validators.compose([
                    Validators.required,
                    Validators.minLength(5)
                ])
            ],
            UpdatedTask: [
                '',
                Validators.compose([
                    Validators.required,
                    Validators.minLength(5)
                ])
            ]
        });
    }

    // todoData = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];
    // onDoingData =['Learn Ionic','Learn Angular','Learn English','Create API With C#'];
    // doneData = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

    drop(event: CdkDragDrop<ITask[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            transferArrayItem(
                event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex,
            );
            this.todoData.map((e: any) => {
                e.isUpdate = false;
            });
        }
        localStorage.setItem('data',JSON.stringify({
            todo: this.todoData,
            ondoing: this.onDoingData,
            done: this.doneData
        }));
    }

    fieldHasError(fieldName: string) {
        return this.formValidationService.fieldHasError(fieldName, this.task);
    }

    getErrorMessage(fieldName: string) {
        return this.formValidationService.getErrorMessage(
            fieldName,
            this.task
        );
    }

    async delete(where:string,index: number){
        const m = await this.widget.ConfirmAlert('Are You Sure You Want To Delete This Task ?');
        if(m){
            
            switch(where){
                case 'toDo' : {
                    this.todoData.splice(index,1);
                    break;
                }
                case 'onDoing' : {
                    this.onDoingData.splice(index,1);
                    break;
                }
                case 'Done' : {
                    this.doneData.splice(index,1);
                    break;
                }
                default: {
                    break;
                }
            }

            localStorage.setItem('data',JSON.stringify({
                todo: this.todoData,
                ondoing: this.onDoingData,
                done: this.doneData
            }));
        }
    }

    toogle(index: any) {
        this.todoData[index].isUpdate = true;
        this.task.get('UpdatedTask')?.setValue(this.todoData[index].description);
    }

    async edit(index: number){
        let value = this.task.get('UpdatedTask')?.value;
        if(value){
            // const m = await this.widget.ConfirmAlert('Are You Sure You Want To Update This Task ?');
            // if(m){
            //     this.todoData[index].description = value;
            //     this.todoData[index].isUpdate = false;
            // }

            this.todoData[index].description = value;
            this.todoData[index].isUpdate = false;
            
            localStorage.setItem('data',JSON.stringify({
                todo: this.todoData,
                ondoing: this.onDoingData,
                done: this.doneData
            }));
            
            this.widget.Alert('Successful Update !','Your task updated successfully','success');

        }
    }

    AddTask(){
        let value = this.task.get('task')?.value;
        if(value){
            this.todoData.push({
                description: value,
                done: false,
                isUpdate: false
            });
            localStorage.setItem('data',JSON.stringify({
                todo: this.todoData,
                ondoing: this.onDoingData,
                done: this.doneData
            }));
            this.initForm();
        }else{
            this.widget.Toast('Fill Required Field !','danger');
        }
    }

}
