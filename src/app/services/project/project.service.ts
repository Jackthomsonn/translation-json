import { IProject } from '../../interfaces/IProject';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ProjectService {

  constructor(private http: HttpClient) { }

  public getProjects = () => {
    return this.http.get(`api/projects`);
  }

  public getProject = (projectId: string) => {
    return this.http.get(`api/projects/${projectId}`);
  }

  public createProject = (project: IProject) => {
    return this.http.post('api/projects', project);
  }
}
