import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddStudentComponent } from "./add-student/add-student.component";
import { UpdateStudentComponent } from "./update-student/update-student.component";
import { StudentDetailsComponent } from "./student-details/student-details.component";
import { ManageStudentComponent } from "./manage-student.component";

const routes: Routes = [
  {
    path: "",
    data: {
      title: "Home",
    },
    children: [
      { path: "", redirectTo: "manageStudent" },
      {
        path: "manageStudent",
        component: ManageStudentComponent,
        data: {
          title: "Manage Student",
        },
      },
      {
        path: "addStudent",
        component: AddStudentComponent,
        data: { title: "Add Student" },
      },
      {
        path: "",
        data: {
          title: "ManageStudent",
        },
        children: [
          { path: "", redirectTo: "updateStudent" },
          {
            path: "updateStudent/:studentId",
            component: UpdateStudentComponent,
            data: { title: "UpdateStudent" },
          },
          {
            path: "studentDetails/:studentId",
            component: StudentDetailsComponent,
            data: { title: "StudentDetails" },
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageStudentRoutingModule {}
