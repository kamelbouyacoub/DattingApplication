import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Message } from '../_models/Message';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';

@Injectable({
  providedIn: 'root'
})
export class MessageService {


  constructor(private http: HttpClient) { }

  getMessages(pageNumber: number, pageSize: number, container: string){
      let params = getPaginationHeaders(pageNumber, pageSize);
      params = params.append('Container', container.toString());
      return getPaginatedResult<Message[]>(environment.message, params, this.http);
  }

  getMessageThread(username: string){
    return this.http.get<Message[]>(environment.message + "/thread/" + username);
  }

  sendMessage(username: string, content: string){
    return this.http.post<Message>(environment?.message, {recipientUsername: username, content})
  }

  deleteMessage(id: number){
    return this.http.delete(environment.message +`/${id}`);
  }
}
