import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../../../service/apiservice.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss']
})
export class StudentDetailsComponent implements OnInit {

  constructor(private service:ApiserviceService, private router:ActivatedRoute) { }

  studentId: any;
  readData:any;

  ngOnInit(): void {
    this.studentId = this.router.snapshot.paramMap.get('studentId');
    console.log(this.studentId, "get ParamId");
    this.readData = this.service.getSingleData(this.studentId).subscribe((res:any) => {
      
      console.log(" data of res ",this.readData);
      console.log("name : ",res.data[0].firstName);
      console.log("data : ",res.data);
      this.readData = res.data[0];
    });
  }
}
