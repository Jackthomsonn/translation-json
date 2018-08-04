import { IProject } from './../../interfaces/IProject';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss']
})

export class ProjectItemComponent {
  @Input() project: IProject;
}
