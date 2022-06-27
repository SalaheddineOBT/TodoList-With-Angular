import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-todo',
    templateUrl: './todo.component.html',
    styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

    task!: FormGroup;

    constructor(
        private fb: FormBuilder
    ) {
        this.initForm();
    }

    ngOnInit(): void { }

    initForm(){
        this.task = this.fb.group({
            task: [
                '', 
                Validators.compose([
                    Validators.required
                ])
            ]
        });
    }

    todoData = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];
    onDoingData =['sdfsdsdsd','cvxvcxccx'];
    doneData = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

    drop(event: CdkDragDrop<string[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            transferArrayItem(
                event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex,
            );
        }
    }

}
