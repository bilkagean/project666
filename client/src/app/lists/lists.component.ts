import { HttpClient } from '@angular/common/http';
import { EventEmitter, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { compact } from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { element } from 'protractor';
import { VirtualTimeScheduler } from 'rxjs';

import { environment } from 'src/environments/environment';
import { altsend } from '../_models/altsend';
import { Member } from '../_models/member';
import { OnlyW } from '../_models/onlyW';
import { User } from '../_models/user';
import { Word } from '../_models/word';
import { AccountService } from '../_services/account.service';
import { MembersService } from '../_services/members.service';


@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  baseUrl = environment.apiUrl;
  @Output() cancelRegister = new EventEmitter();
  model: Word;
  sendthis:Word;
  unknownwords:Word[];
  user:User;
  exc:string[];
  textarea: string;
  separators;
  wordsChars:string[];
  wordsWords:string[];
  filterword:string;
  txtdata:string;
  forstring:string;
  gotWords:Word[];
  index:number;
  thing:any;
  altsendthis:altsend;
  removeD:string[];
  userKnownWords:OnlyW[];
  counter:number=0;
  counterwords:string[];
  setcounterwords:string[];

  constructor(public accountService: AccountService,private http: HttpClient,private memberService:MembersService, private toastr:ToastrService) { }

  ngOnInit(): void {this.getCurrent(); }

  addWords(word1:string,id1:number,known1:boolean) {
    this.sendthis =
    {
      userId:id1,
      known:known1,
      word:word1
    }
    this.http.post(this.baseUrl+'words/save',this.sendthis).subscribe(res =>{
      console.log(res);
      this.toastr.info(word1+" is saved to known words list");
      this.thing = this.thing.filter(data => !(data.includes(word1)) ) 
    },error =>{
      console.log(error);
      this.toastr.error(word1+" is already saved to known words list");
      this.thing = this.thing.filter(data => !(data.includes(word1)) )
    }
    )
  }

  getTextAlternative(textarea,userid)/// this is in use lately
  {
    this.counterwords=[];
    this.counter=0;
    this.altsendthis=
    {
      textstring:textarea,
      userid:userid
    }

    this.http.post(this.baseUrl+'words/gettext',this.altsendthis).subscribe(
      res => this.thing=res)
  }

  getunknownwords(word,id)
  {
    this.http.get<Word[]>(this.baseUrl+'words/unknown'+id).subscribe(res => this.unknownwords=res);
  }

  countunknownwords(word)
  {this.counter++;
    this.counterwords.push(word);
    console.log(this.counterwords)
  }

  setcwords()
  {
    this.setcounterwords=this.counterwords;
  }

  showaddwords(){
    while(this.counter<1)
    {
      return true
    }
  }

 

  ///deprecated
  getText(textarea) //(click)="getText(textarea)"
  { 
    this.setKnownWords();
    this.textarea=textarea;
    this.textarea.toLowerCase();
    this.textareaIcorrect();
    this.splitMulti(textarea);
    this.removeDuplicate();
    this.filterwords();
    
  }

  
 splitMulti(str:string){
  
 this.wordsChars = str.split(" ").join(",")
 .split("1").join(",")
 .split("2").join(",")
 .split("3").join(",")
 .split("4").join(",")
 .split("5").join(",")
 .split("6").join(",")
 .split("7").join(",")
 .split("8").join(",")
 .split("9").join(",")
 .split("0").join(",")
 .split("%").join(",")
 .split("-").join(",")
 .split("-").join(",")
 .split("&").join(",")
 .split("*").join(",")
 .split("/").join(",")
 .split("#").join(",")
 .split("$").join(",")
 .split("?").join(",")
 .split("!").join(",")
 .split(".").join(",")
 .split(",").join(",")
 .split(";").join(",")
 .split(":").join(",")
 .split("(").join(",")
 .split(")").join(",")
 .split("]").join(",")
 .split("[").join(",")
 .split("{").join(",")
 .split("}").join(",")
 .split("\t").join(",")
 .split("\n").join(",")
 .split("\"").join(",")
 .split("\\").join(",")
 .split("\0").join(",")
 .split(".").join(",")
 .split(",").join(",")
 .split(","); //istenilen karakterler bunun içine yazılır  .split(" ").join(",")  
    console.log(this.wordsChars);
}
 filterwords()
 {
   this.checkThereIs();
   this.deleteNulls();
 }
 
 checkThereIs(){
  for( this.forstring in this.exc)
  {
    this.index=this.wordsChars.indexOf(this.exc[this.forstring]);
    if(this.index>-1)
    {
      this.wordsChars.splice(this.index,1);
    }
  }
  this.wordsWords=this.wordsChars
  console.log(this.wordsWords);
 }

 deleteNulls(){
  for(var x in this.wordsWords){
    if(this.wordsWords[x]=="")
    this.index= this.wordsWords.indexOf(this.wordsWords[x])
    if(this.index>-1)
    {
      this.wordsWords.splice(this.index,1);
    }
  }
  console.log(this.wordsWords);
 }
 textareaIcorrect()
 {
  this.textarea.replace("I","i");
  this.textarea.replace("ı","i");
 }
 removeDuplicate()
 {
   for (var x in this.wordsChars)
   {
     for(var y in this.removeD)
     {
       if(!(this.wordsChars[x]==this.removeD[y]))
       {
         this.removeD.push(this.wordsChars[x]);
       }
     }
   }
  this.wordsWords== this.removeD;
 }

 setKnownWords(){
  this.http.get<OnlyW[]>(this.baseUrl+'words/knownOnlyWords/'+this.user.id).subscribe(words =>
    {
     this.userKnownWords =words;
     console.log(this.userKnownWords);
    });

    for(var x in this.userKnownWords)
    {
      this.exc.push(this.userKnownWords[x].word)
      console.log(this.userKnownWords[x]);
    }
   console.log(this.exc);
 }
 getCurrent(){
  this.accountService.currentUser$.subscribe(user =>{this.user=user})
 }

  cancel() {
    this.cancelRegister.emit(false);
  }

}
