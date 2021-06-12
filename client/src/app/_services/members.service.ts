import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';
import { Word } from '../_models/word';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;
  words:Word[]
  

  constructor(private http: HttpClient) { }

  getMembers(){
    return this.http.get<Member[]>(this.baseUrl+'users');
  }

  getMember(username){
   return this.http.get<Member>(this.baseUrl+'users/'+username);
  }
  setWordKnown(word:Word)
  {
    return this.http.post(this.baseUrl+'words/save',word)
  }

  
}
