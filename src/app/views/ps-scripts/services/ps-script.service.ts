import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PsScriptService {
  base_href=environment.csharp_base_href+"api/";
  run_script = "PowershellScripting/powershellscript";
  path = "Script/get-api.ps1";

  constructor(
    private http: HttpClient,
  ) { }

  runScript(path):Observable<any>{
    return this.http.get<any>(`${this.base_href}${this.run_script}?path=${path}`);
  }
}
