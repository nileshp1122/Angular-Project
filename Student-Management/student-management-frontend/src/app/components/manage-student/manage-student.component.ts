import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../../service/apiservice.service';

@Component({
  selector: 'app-manage-student',
  templateUrl: './manage-student.component.html',
  styleUrls: ['./manage-student.component.scss']
})
export class ManageStudentComponent implements OnInit {

  constructor(private service:ApiserviceService) { }

  readData:any;

  ngOnInit(): void {

    this.service.getAllData().subscribe((res)=> {
      console.log(res, "res==>");
      this.readData = res.data;
    });
  }

  inActive: "inActive";
  //Deactivated
  patchId(studentId:any) {
    this.service.patchData(this.inActive,studentId).subscribe((res) => {
      console.log(res,'patchres==>');

      this.service.getAllData().subscribe((res)=> {
        console.log(res, "res==>");
        this.readData = res.data;
      });
    });
  }
}
