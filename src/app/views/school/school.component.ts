import { Component, OnInit } from '@angular/core';
import { SchoolService } from 'app/shared/services/school.service';
import { Router } from '@angular/router';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { environment } from '../../../environments/environment'

@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.css']
})
export class SchoolComponent implements OnInit {
  schoolData = [];
  noSchoolData: boolean = false;
  constructor(private SchoolService: SchoolService ,
    private loader: AppLoaderService,) { }

  ngOnInit(): void {
    this.getSchoolDetails();
  }

  getSchoolDetails(){
    this.loader.open();
    this.SchoolService.getSchoolDetails(environment.tenantId)
    .subscribe(data => {
      
      for(var i=0; i<=data.length; i++){
        this.schoolData.push(JSON.stringify(data[i],null, 4))
      }
      this.loader.close();
    },
    (error)=>{
      this.loader.close();
      this.noSchoolData = true
     console.log(error)
    })
  }
}
