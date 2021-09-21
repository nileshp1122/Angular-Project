import { Component, OnInit } from "@angular/core";
import { ApiserviceService } from '../../service/apiservice.service';

@Component({
  templateUrl: "dashboard.component.html",
})
export class DashboardComponent implements OnInit {

  readData: any;
  activeData: any;
  inActiveData: any;
 
  constructor(private service:ApiserviceService) {}
  ngOnInit(): void {

    this.service.getTotalData().subscribe((res:any)=> {
      console.log(res, "res==>");
      this.readData = res.data.length;
    });
    
    this.service.getAllData().subscribe((res)=> {
      console.log(res, "res==>");
      this.activeData = res.data.length;

      console.log(this.readData, "readData==>");
      console.log(this.activeData, "activeData==>");
      let total = this.readData;
      let active = this.activeData;
      this.inActiveData = total - active;
    }); 
  }
}
