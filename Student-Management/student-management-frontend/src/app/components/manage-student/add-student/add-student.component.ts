import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl,FormGroup, NgForm } from '@angular/forms';
import { ApiserviceService } from '../../../service/apiservice.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit {

  constructor(private service:ApiserviceService,private router1:Router, private router:ActivatedRoute, private datePipe: DatePipe, private form:FormBuilder ) { }

  getparamid:any;
  images:any;

  @ViewChild('user') signUpForm!:NgForm;

  ngOnInit(): void {

  }

  //Add New data
  onSubmit(user : NgForm) {
    console.log(user);
    const formData = new FormData();
    formData.append('photo',this.selectedFile, this.selectedFile.name);
    formData.append("firstName",this.signUpForm.form.value.firstName);
    formData.append("lastName",this.signUpForm.form.value.lastName);
    formData.append("email",this.signUpForm.form.value.email);
    formData.append("phone",this.signUpForm.form.value.phone);
    formData.append("gender",this.signUpForm.form.value.gender);
    formData.append("grade",this.signUpForm.form.value.grade);
    formData.append("dob",this.signUpForm.form.value.dob);
    formData.append("address",this.signUpForm.form.value.address);
  
    console.log("Formdataa",formData);

    this.service.createData(formData).subscribe((res)=> {
      console.log(res,'res==>');
      this.router1.navigate(['/manageStudent']);
    });
    console.log(this.signUpForm.form.value.photo = this.selectedFile.name,'formValue');
    this.signUpForm.form.reset();

  }

  selectedFile: any = null;
  imgPath: string="assets/img/user-64.png";

  onFileSelect(event:any) {
    console.log("File = ",event);
    this.selectedFile = <any>event.target.files[0];

    console.log("File zero = ",this.selectedFile);

    const reader = new FileReader();
      reader.onload = () => {
        this.imgPath = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
  }
}
