import {Injectable} from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})

export class SweetMessageService {

    canDriveMessage() {
        return Swal.fire({
            title: '',
            text:'Can be on the road',
            icon: 'success',
            width: '300px',
            color: '#0078d7',           
            confirmButtonColor:'#0078d7',
            padding: '2px'
        });
    }

    canNotDriveMessage(){
        return Swal.fire({
            text: 'Can not be on the road',
            width: '300px',
            color: 'red',
            icon:'error',
            confirmButtonColor:'red',
            padding: '2px'
        })
    }
    
    successImportGuests() {
        return Swal.fire({
            title: '',
            text:'Información importada exitosamente',
            icon: 'success',           
            width: '300px',
            color: '#0078d7',           
            confirmButtonColor:'#0078d7',
            padding: '2px'
        })
    }

    successStoreTables() {
        return Swal.fire({
            title: '',
            text:'Mesas creadas exitosamente',
            icon: 'success',           
            width: '300px',
            color: '#0078d7',           
            confirmButtonColor:'#0078d7',
            padding: '2px'
        })
    }

    successStoreChairs() {
        return Swal.fire({
            title: '',
            text:'Sillas agregadas exitosamente',
            icon: 'success',           
            width: '300px',
            color: '#0078d7',           
            confirmButtonColor:'#0078d7',
            padding: '2px'
        })
    }

    successAddChair() {
        return Swal.fire({
            title: '',
            text:'Silla asignada exitosamente',
            icon: 'success',           
            width: '300px',
            color: '#0078d7',           
            confirmButtonColor:'#0078d7',
            padding: '2px'
        })
    }
}
