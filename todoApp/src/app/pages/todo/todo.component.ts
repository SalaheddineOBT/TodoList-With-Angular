import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormValidationService } from 'src/app/services/form-validator/form-validation.service';
import { WidgetService } from 'src/app/services/widget/widget.service';

@Component({
    selector: 'app-todo',
    templateUrl: './todo.component.html',
    styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

    task!: FormGroup;

    constructor(
        private fb: FormBuilder,
        private formValidationService: FormValidationService,
        private widget: WidgetService
    ) {
        this.initForm();
    }

    ngOnInit(): void { }

    initForm(){
        this.task = this.fb.group({
            task: [
                '', 
                Validators.compose([
                    Validators.required,
                    Validators.minLength(5)
                ])
            ]
        });
    }

    todoData = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];
    onDoingData =['Learn Ionic','Learn Angular','Learn English','Create API With C#'];
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

    fieldHasError(fieldName: string) {
        return this.formValidationService.fieldHasError(fieldName, this.task);
    }

    getErrorMessage(fieldName: string) {
        return this.formValidationService.getErrorMessage(
            fieldName,
            this.task
        );
    }



}
