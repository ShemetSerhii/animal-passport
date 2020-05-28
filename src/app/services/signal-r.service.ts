import { Injectable, Output, EventEmitter } from '@angular/core';

import * as signalR from "@aspnet/signalr";

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  @Output() resiveId = new EventEmitter<string>();

  private hubConnection: signalR.HubConnection
 
  public startConnection(): void {
    this.hubConnection = new signalR.HubConnectionBuilder()
                            .withUrl('http://localhost:54063/remote-access')
                            .build();
 
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err));
      
      this.hubConnection.on('process', (data) => {
        this.resiveId.emit(data);
      });
  }
}
