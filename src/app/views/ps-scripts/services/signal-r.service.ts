import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../shared/services/auth/auth.service';
@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  migrationStepsResponse = new BehaviorSubject<string>("update"); 
  migrationStepsResponse$ = this.migrationStepsResponse.asObservable();
  public loggedUsername: string;
  public connectionId: string;
  public data: object;

  constructor(
    private auth: AuthService,

 
) {
    this.loggedUsername = this.auth.getLoggedInUser().name;
}


public hubConnection: signalR.HubConnection
    public startConnection = () => {
        this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl(`${environment.csharp_base_href}pshub?user=${this.loggedUsername}`)
            .build();
        this.hubConnection
            .start()
            .then(() => console.log('Connection started'))
            .then(() => this.getConnectionId())
            .catch(err => console.log('Error while starting connection: ' + err))
  }
  
    public getConnectionId = () => {
        this.hubConnection.invoke('getconnectionid').then(
            (data) => {
                console.log(data);
                this.connectionId = data;
            }
        );
    }
  public stopConnection = () => {
    this.hubConnection
      .stop()
      .then(() => console.log('Connection stopped'))
      .catch(err => console.log('Error while stoping connection: ' + err))
  }

  public addTransferPSDataListener = () => {
      this.hubConnection.on('transferpsdata', (data) => {
      this.data = data;
      console.log(data);
    });
  }

  // public migrationStepExecuterListener = (param) => {
  //   this.hubConnection.invoke('MigrationStepExecuter', (data) => {
  //     console.log(data);
  //   });

  //   this.migrationService

  //   return this._http.get(getUrl, options)
  //   .pipe(operators_1.map(function (res) { return res.json(); }))
  //   .pipe(operators_1.catchError(this.handleError));
  // }

  // public migrationStepResponseListener = () => {
  //   this.hubConnection.on('MigrationResponse', (data) => {
  //     console.log(data.message);
  //     this.migrationStepsResponse.next(data.message);
  //   });
  // }

}