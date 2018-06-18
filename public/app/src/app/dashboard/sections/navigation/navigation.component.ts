import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { Project } from "../../../../../../../shared/interfaces/-index";
import { ProjectService } from "../../../shared/project/project.service";


@Component({
  moduleId    : module.id,
  selector    : "tms-navigation",
  templateUrl : "navigation.component.html",
  styleUrls   : ["navigation.component.css"]
})
export class NavigationComponent implements OnInit {

  projects: Project[] = [];
  
  isNewTask: boolean = false;
  errorMessage: string;
  
  constructor(private router: Router,
              private route: ActivatedRoute,
              private projectService: ProjectService) {}
              
  ngOnInit(): void {
    const projectLists = this.route.snapshot.data.projects;
    this.projects      = projectLists.sort((a, b) => a.ordinal - b.ordinal);
  }
  
  addNewProject(name: string): void {
    if (name) {
      this.projectService
      .saveNewProject({ name })
      .subscribe(
        response => {
          const color = response.projectColor;
          
          this.projects.push({ name, color });
          this.isNewTask = false;
        },
        err => {
          const parseError = JSON.parse(err._body);
          this.errorMessage = parseError.errorMessages[0].message;
        }
      );
    }
  }
  
  cancel(): void {
    this.isNewTask = false;
    this.errorMessage = "";
  }

}
