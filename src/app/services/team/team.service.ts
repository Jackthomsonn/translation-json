import { ITeam } from './../../interfaces/ITeam';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class TeamService {

  constructor(private http: HttpClient) { }

  public createTeam = (team: ITeam) => {
    return this.http.post('api/teams', team);
  }

  public getTeam = (teamId: string) => {
    return this.http.get(`api/teams/${teamId}`);
  }
}
