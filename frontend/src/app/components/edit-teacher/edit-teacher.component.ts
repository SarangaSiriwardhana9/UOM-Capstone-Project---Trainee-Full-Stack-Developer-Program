import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import {AppServiceService} from '../../app-service.service';

@Component({
  selector: 'app-edit-teacher',
  templateUrl: './edit-teacher.component.html',
  styleUrls: ['./edit-teacher.component.css']
})
export class EditTeacherComponent implements OnInit {


  teacherData: any;


  constructor(private service: AppServiceService, private router: Router) { }

  navigation = this.router.getCurrentNavigation();

  ngOnInit(): void {
    this.getTeacherData();
  }

  // tslint:disable-next-line:typedef
  getTeacherData(){
    const teacher = {
      id : this.navigation.extras.state.id
    };
    this.service.getOneTeacherData(teacher).subscribe((response) => {
      this.teacherData = response[0];
    }, (error) => {
      console.log('ERROR - ', error);
    });
  }

  // tslint:disable-next-line:typedef
  editTeacher(values){
    values.id = this.navigation.extras.state.id;
    this.service.editTeacher(values).subscribe((response) => {
      this.teacherData = response[0];
    }, (error) => {
      console.log('ERROR - ', error);
    });
  }

}
