import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ManageStudentRoutingModule } from "./manage-student-routing.module";
import { ManageStudentComponent } from "./manage-student.component";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AddStudentComponent } from "./add-student/add-student.component";
import { AlertModule } from "ngx-bootstrap/alert";
import { ModalModule } from "ngx-bootstrap/modal";
import { UpdateStudentComponent } from './update-student/update-student.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
@NgModule({
  declarations: [
    ManageStudentComponent,
    AddStudentComponent,
    UpdateStudentComponent,
    StudentDetailsComponent,
  ],
  imports: [
    CommonModule,
    ManageStudentRoutingModule,
    FormsModule,
    PaginationModule.forRoot(),
    AlertModule.forRoot(),
    ModalModule.forRoot(),
    ReactiveFormsModule,
  ],
})
export class ManageStudentModule {}
