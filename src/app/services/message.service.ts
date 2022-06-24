import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
// Service for managing messages on the screen
export class SweetMessageService {
    // Each method is a different message
    canDriveMessage() {
        return Swal.fire({
            title: '',
            text: 'Can be on the road',
            icon: 'success',
            width: '300px',
            color: '#0078d7',
            confirmButtonColor: '#0078d7',
            padding: '2px'
        });
    }

    canNotDriveMessage() {
        return Swal.fire({
            text: 'Can not be on the road',
            width: '300px',
            color: 'red',
            icon: 'error',
            confirmButtonColor: 'red',
            padding: '2px'
        })
    }
}
