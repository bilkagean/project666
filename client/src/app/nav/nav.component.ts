
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { error } from 'selenium-webdriver';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any ={};
  

  constructor(public accountService: AccountService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
  
  }
  login()
  {
   this.accountService.login(this.model).subscribe(res =>{
     this.router.navigateByUrl('/messages')

   })
  }
  logout(){
    this.accountService.logout();
    this.router.navigateByUrl('/');

  }
}