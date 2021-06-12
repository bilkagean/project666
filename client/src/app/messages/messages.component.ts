import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { words } from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { from } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';
import { Word } from '../_models/word';
import { AccountService } from '../_services/account.service';
import { MembersService } from '../_services/members.service';


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  baseUrl = environment.apiUrl;
  knownWords:Word[];
  unKnownWords:Word[];
  user:User;
  index:number;
  params:string;

  
  constructor(public accountService: AccountService,private http: HttpClient,private router:Router, private memberService:MembersService, private toastr:ToastrService) { }

  ngOnInit(): void 
  { this.getCurrent();
    this.getKnownWords();
    this.getUnknownWords();
  }

  getKnownWords(){
   this.http.get<Word[]>(this.baseUrl+'words/known/'+this.user.id).subscribe(words =>
    {
      this.knownWords =words;
    });
  }
  getUnknownWords(){
    this.http.get<Word[]>(this.baseUrl+'words/unknown/'+this.user.id).subscribe(words =>
      {
        this.unKnownWords =words;
      });
  }
  getCurrent(){
    this.accountService.currentUser$.subscribe(user =>{this.user=user})
    
  }
  addKnown(word:string,UserId:number){
    this.http.get(this.baseUrl+'words/update/addknown/'+word+'/'+UserId).subscribe(words=>console.log(word))
    this.index= this.unKnownWords.findIndex(x=>x.word=word)
    this.unKnownWords.splice(this.index,1);
   }
   


  navigate()
  {
    this.router.navigateByUrl('/knownWords');
  }
  googleTranslateElementInit()
  {
    
  }

}
