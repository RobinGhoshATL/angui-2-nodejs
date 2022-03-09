import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {
 
  base_href=environment.node_base_href;
  get_school_by_id = 'school/';
  constructor(
    private http: HttpClient
  ) {
    
  }

  getSchoolDetails(schoolId){
    return this.http.get<any>(`${this.base_href}${this.get_school_by_id}${schoolId}`);
  }

}

