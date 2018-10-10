import { ITeam } from './../../interfaces/ITeam';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class TeamService {

  constructor(private http: HttpClient) { }

  public createTeam = (team: ITeam) => {
    return this.http.post('http://localhost:8080/api/teams', team);
  }

  public getTeam = (teamId: string) => {
    return this.http.get(`http://localhost:8080/api/teams/${teamId}`);
  }
}
