import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from '../dashboard.service';
import { CategoryPopupComponent } from './category-popup/category-popup.component';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  routeData = [
    {
      'name': 'Category',
      'link': '/dashboard'
    }
  ]
  categoryList: any = []

  constructor(private dialogRef: MatDialog, private service: AdminService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.service.GetAllCategory().subscribe({
      next: (data: any) => {
        this.categoryList = data.data
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  openPopup(data?: any) {
    let dialog = this.dialogRef.open(CategoryPopupComponent, {
      disableClose: false,
      data: data ? data : null,
      minWidth: '50vw',
    })

    dialog.afterClosed().subscribe((e: any) => {
      if (e != '') {
        this.ngOnInit()
      }
    })
  }

  deleteGroup(id: any) {

    Swal.fire({
      title: 'Do you want to delete the category?',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Cancel`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.service.deleteCategory(id).subscribe({
          next: (data: any) => {
            this.toastr.success(data.data)
            this.ngOnInit()
          },
          error: (err: any) => {
            this.toastr.error(err.error.message)
          }
        })
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })

  }

  statusChanged(data: any, id: any) {
    // let formObject = <any>{}
    // formObject.status = data.target.checked
    // formObject.id = id
    // this.GroupService.changeGroupStatus(formObject).subscribe({
    //   next: (data: any) => {
    //     this.toastr.success(data)
    //     this.ngOnInit()
    //   },
    //   error: (err: any) => {
    //     this.toastr.error(err.error.message)
    //   }
    // })
  }

}
