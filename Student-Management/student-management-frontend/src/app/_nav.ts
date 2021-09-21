import { INavData } from "@coreui/angular";

export const navItems: INavData[] = [
  {
    name: "Dashboard",
    url: "/dashboard",
    icon: "icon-speedometer",
  },
  {
    title: true,
    name: 'Student'
  },
  {
    name: 'Manage Student',
    url: '/manageStudent',
    icon: 'icon-list'
  },
  {
    name: 'Add Student',
    url: '/addStudent',
    icon: 'icon-plus'
  }

  // {
  //   name: "Students",
  //   url: "/students",
  //   icon: "fa fa-users",
  //   children: [
  //     {
  //       name: "Student Details",
  //       url: "/manageStudent",
  //       icon: "fa fa-list",
  //     },
  //     {
  //       name: "Add Student",
  //       url: "/addStudent",
  //       icon: "icon-plus",
  //     },
  //   ],
  // },
];
