import { IProject } from '../../interfaces/IProject';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ProjectService {

  constructor(private http: HttpClient) { }

  public getProjects = (query: string) => {
    return this.http.get(`http://localhost:8080/api/projects?q=${query}`);
  }

  public getProject = (projectId: string) => {
    return this.http.get(`http://localhost:8080/api/projects/${projectId}`);
  }

  public createProject = (project: IProject) => {
    return this.http.post('http://localhost:8080/api/projects', project);
  }
}
