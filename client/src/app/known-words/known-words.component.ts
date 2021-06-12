import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { MembersService } from '../_services/members.service';

@Component({
  selector: 'app-known-words',
  templateUrl: './known-words.component.html',
  styleUrls: ['./known-words.component.css']
})
export class KnownWordsComponent implements OnInit {

  user:User;
  index:number;
  knownWords:string[];
  baseUrl = environment.apiUrl;

  constructor(public accountService: AccountService,private http: HttpClient,private memberService:MembersService, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.getCurrent();
    this.setKnownWords();
  }
    

  setKnownWords(){
    this.http.get<string[]>(this.baseUrl+'words/knownOnlyWords/'+this.user.id).subscribe(words =>
      {
       this.knownWords =words;
      });
     
   }
   getCurrent(){
    this.accountService.currentUser$.subscribe(user =>{this.user=user})
   }
   deleted(word:string,UserId:number)
   {
     this.http.delete(this.baseUrl+'words/update/delete/'+word+'/'+UserId).subscribe(x =>console.log(x));
     
     //denedim ama olmuyor.
   }


}
