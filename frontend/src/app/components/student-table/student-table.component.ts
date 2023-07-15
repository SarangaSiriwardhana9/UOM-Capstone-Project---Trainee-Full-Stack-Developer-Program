import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { faTrash, faPlus, faPenSquare } from '@fortawesome/free-solid-svg-icons';
import { AppServiceService } from '../../app-service.service';

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.css']
})
export class StudentTableComponent implements OnInit {

  faTrash = faTrash;
  faPlus = faPlus;
  faPenSquare = faPenSquare;
  studentData: any[] = [];
  selected: any;

  constructor(private service: AppServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getStudentData();
  }

  addNewStudent(): void {
    this.router.navigate(['addStudent']);
  }

  editStudent(id: number): void {
    const navigationExtras: NavigationExtras = {
      state: {
        id: id
      }
    };
    this.router.navigate(['editStudent'], navigationExtras );
  }

  getStudentData(): void {
    this.service.getStudentData().subscribe(
        (response) => {
          this.studentData = Object.values(response);
        },
        (error) => {
          console.log('ERROR - ', error);
        }
    );
  }

  deleteStudent(itemid: number): void {
    const student = {
      id: itemid
    };
    this.service.deleteStudent(student).subscribe(
        (response) => {
          this.getStudentData();
        },
        (error) => {
          console.log('ERROR - ', error);
        }
    );
  }

  search(value: string): void {
    const foundItems = [];
    if (value.length <= 0) {
      this.getStudentData();
    } else {
      this.studentData.filter((student) => {
        if (student.name.toLowerCase().indexOf(value) > -1) {
          foundItems.push(student);
        }
      });
      this.studentData = foundItems;
    }
  }
}
