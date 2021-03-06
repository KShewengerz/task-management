import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { BasicInfoComponent } from "./basic-info/basic-info.component";
import { ChangePasswordComponent } from "./change-password/change-password.component";

import { User } from "../../../../../../shared/interfaces/-index";


@Component({
  moduleId    : module.id,
  selector    : "tms-profile",
  templateUrl : "profile.component.html",
  styleUrls   : ["profile.component.css", "../../landing/signup/signup.component.css"],
  entryComponents : [
    BasicInfoComponent,
    ChangePasswordComponent
  ]
})
export class ProfileComponent implements OnInit {
  
  users: User[] = [];
  user: User;
  
  isBasic: boolean = true;
  
  constructor(private router: Router,
              private route: ActivatedRoute) {}
  
  ngOnInit() {
    const session = sessionStorage.getItem("user");
    
    this.user  = JSON.parse(session);
    this.users = this.route.snapshot.data.users.filter(user => user.id != this.user.id);
  }
  

}
