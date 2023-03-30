import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-notice-pop',
    templateUrl: './notice-pop.component.html',
    encapsulation: ViewEncapsulation.None
})
export class NoticePopComponent implements OnInit {

    imageEnvironmentUrl = environment.Main_Api + 'media/file/'
    noticeList: any
    constructor(@Inject(MAT_DIALOG_DATA) public data: any,private dialogRef : MatDialogRef<NoticePopComponent>) { }

    ngOnInit(): void {
        this.noticeList = this.data
        console.log(this.noticeList);
    }

    close(){
        this.dialogRef.close()
    }

}
