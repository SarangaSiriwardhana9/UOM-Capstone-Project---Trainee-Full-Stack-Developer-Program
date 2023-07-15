import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { faTrash, faPlus, faPenSquare } from '@fortawesome/free-solid-svg-icons';
import { AppServiceService } from '../../app-service.service';

@Component({
  selector: 'app-teacher-table',
  templateUrl: './teacher-table.component.html',
  styleUrls: ['./teacher-table.component.css']
})
export class TeacherTableComponent implements OnInit {

  faTrash = faTrash;
  faPlus = faPlus;
  faPenSquare = faPenSquare;
  teacherData: any[] = [];
  selected: string;

  constructor(private service: AppServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getTeacherData();
  }

  addNewTeacher(): void {
    this.router.navigate(['addTeacher']);
  }

  editTeacher(id: number): void {
    const navigationExtras: NavigationExtras = {
      state: {
        id
      }
    };
    this.router.navigate(['editTeacher'], navigationExtras);
  }

  initializeDB(): void {
    this.service.initializeDB().subscribe(
        (response) => {
          console.log('DB is Initialized');
        },
        (error) => {
          console.log('ERROR - ', error);
        }
    );
  }

  getTeacherData(): void {
    this.selected = 'Teachers';
    this.service.getTeacherData().subscribe(
        (response) => {
          this.teacherData = Object.values(response);
        },
        (error) => {
          console.log('ERROR - ', error);
        }
    );
  }
  getStudentData(): void {
    this.selected = 'Students';
    this.service.getStudentData().subscribe(
        (response) => {
          const teachers = Object.values(response).map((teacher: any) => ({
            id: teacher.id,
            name: teacher.name
            // Add other properties as needed
          }));
          this.teacherData = teachers;
        },
        (error) => {
          console.log('ERROR - ', error);
        }
    );
  }
  search(value: string): void {
    if (value.length <= 0) {
      this.getTeacherData();
    } else {
      this.service.getTeacherData().subscribe(
          (response) => {
            this.teacherData = Object.values(response).filter((teacher) => {
              return teacher.name.toLowerCase().indexOf(value) > -1;
            });
          },
          (error) => {
            console.log('ERROR - ', error);
          }
      );
    }
  }

  deleteTeacher(itemid: number): void {
    const test = {
      id: itemid
    };
    this.service.deleteTeacher(test).subscribe(
        (response) => {
          this.getTeacherData();
        },
        (error) => {
          console.log('ERROR - ', error);
        }
    );
  }
}
