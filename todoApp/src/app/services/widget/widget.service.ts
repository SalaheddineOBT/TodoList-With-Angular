import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import Swal from 'sweetalert2'

@Injectable({
    providedIn: 'root'
})
export class WidgetService {

    constructor(
        private snackbar: MatSnackBar
    ) { }

    Toast(message: any,type: any){
        this.snackbar.open(message,'',{
            duration: 4000,
            horizontalPosition: 'center',
            panelClass: [type]
        });

        //type = warning - success - danger
    }

    Alert(title: any, message: any,type: any){
        Swal.fire(title, message, type);
        // Swal.fire(title, message, 'success')
        // Swal.fire(title, message, 'error')
        // Swal.fire(title, message, 'info')
        // Swal.fire(title, message, 'warning')
    }

    async ConfirmAlert(question: any): Promise<boolean>{
        let val = false;
        await Swal.fire({
            icon:'question',
            title: question,
            // showDenyButton: true,
            showCancelButton: true,
            //showCloseButton: true,
            confirmButtonText: 'YES',
            denyButtonText: 'NO',
        }).then((result) => {
            if (result.isConfirmed) {
                val = true;
            } /*else if (result.isDenied) {
                val = false;
            }*/
        })
        return val;
    }

    /*const m = await this.widget.ConfirmAlert('its question test ?');
    if(m){
        this.widget.Alert('SuccessAlert','JustMessage','info');
    }*/

}
