import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilesService {
 
  base_href=environment.base_href;
  all = 'blob/all';
  add = 'blob';
  constructor(
    private http: HttpClient
  ) {
    
  }

  getFiles(){
    return this.http.get<any>(`${this.base_href}${this.all}`);
  }

  addFile(value): Observable<any>  {
    return this.http.post<any>(`${this.base_href}${this.add}`, JSON.stringify(value));
  }
  
}

