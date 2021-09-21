import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl,FormGroup, NgForm } from '@angular/forms';
import { ApiserviceService } from '../../../service/apiservice.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.component.html',
  styleUrls: ['./update-student.component.scss']
})
export class UpdateStudentComponent implements OnInit {

  constructor(private service:ApiserviceService,private router1:Router, private router:ActivatedRoute, private datePipe: DatePipe, private form:FormBuilder ) { }

  getparamid:any;
  readData:any;
  images:any;

  @ViewChild('user') signUpForm!:NgForm;

  ngOnInit(): void {
    
    this.getparamid = this.router.snapshot.paramMap.get('studentId');
    console.log(this.getparamid, "get ParamId");
    this.service.getSingleData(this.getparamid).subscribe((res) => {
      console.log(res,'res==>');
      let dob = this.datePipe.transform(res.data[0].dob, 'yyyy-MM-dd');

      if (this.getparamid) {
        this.signUpForm.form.patchValue({
          studentId:res.data[0].studentId,
          firstName:res.data[0].firstName,
          lastName:res.data[0].lastName,
          email:res.data[0].email,
          phone:res.data[0].phone,
          gender:res.data[0].gender,
          grade:res.data[0].grade,
          dob:dob,
          address:res.data[0].address,
        });
      } else {
        console.log("Data not get");
      }
      this.imgPath = `http://localhost:3000/uploaded_img/${res.data[0].photo}`;
      console.log(this.datePipe.transform(res.data[0].dob, 'yyyy-MM-dd'));
      console.log("form = ",this.getparamid);
    });
  }

  // Update data
  onSubmit(user : NgForm) {
    console.log(user);
    console.log(this.signUpForm.form.value,'updatedFormData');

    const formData = new FormData();
    if (this.selectedFile) {
      formData.append('photo',this.selectedFile, this.selectedFile.name);
      formData.append("firstName",this.signUpForm.form.value.firstName);
      formData.append("lastName",this.signUpForm.form.value.lastName);
      formData.append("email",this.signUpForm.form.value.email);
      formData.append("phone",this.signUpForm.form.value.phone);
      formData.append("gender",this.signUpForm.form.value.gender);
      formData.append("grade",this.signUpForm.form.value.grade);
      formData.append("dob",this.signUpForm.form.value.dob);
      formData.append("address",this.signUpForm.form.value.address);
    } else {
      formData.append("firstName",this.signUpForm.form.value.firstName);
      formData.append("lastName",this.signUpForm.form.value.lastName);
      formData.append("email",this.signUpForm.form.value.email);
      formData.append("phone",this.signUpForm.form.value.phone);
      formData.append("gender",this.signUpForm.form.value.gender);
      formData.append("grade",this.signUpForm.form.value.grade);
      formData.append("dob",this.signUpForm.form.value.dob);
      formData.append("address",this.signUpForm.form.value.address);
    }
    console.log(" fileselected ",this.selectedFile != null);
    console.log("Formdataa",formData);

    if (this.signUpForm.form.valid) {
      this.service.updateData(formData,this.getparamid).subscribe((res)=> {
        console.log(res,'resUpdated');
        this.router1.navigate(['/manageStudent']);
      });
      this.signUpForm.form.reset();
    }
  }

  selectedFile: any = null;
  imgPath: any="assets/img/user-64.png";

  //file select
  onFileSelect(event:any) {
    console.log("File = ",event);
    this.selectedFile = <any>event.target.files[0];
    console.log("File zero = ",this.selectedFile);

    const reader = new FileReader();
    reader.onload = () => {
      this.imgPath = reader.result as string;
    };
    reader.readAsDataURL(this.selectedFile)
  }
}
