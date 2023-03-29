import { Classe } from './players/classe';
import { Injectable } from '@angular/core';
import { Player } from './players/player';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Guild } from './players/guild';
import { environment } from '../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  apiURL: string = environment.apiURLBase;

  constructor( private http: HttpClient) {
    
   }
  
  salvar( player: Player) : Observable<Player> {
    return this.http.post<Player>(`${this.apiURL}/players`, player);
  }

  atualizar( player: Player) : Observable<any> {
    return this.http.put<Player>(`${this.apiURL}/players/${player.id}`, player);
  }
  
  getPlayers() : Observable<Player[]>{
    return this.http.get<Player[]>(`${this.apiURL}/players/all`);
  } 

  getPlayerById(id: number) : Observable<Player>{
    return this.http.get<any>(`${this.apiURL}/players/${id}`);
  }

  getClasses() : Observable<Classe[]>{
    return this.http.get<Classe[]>(`${this.apiURL}/classe`);
  }

  getClas() : Observable<Guild[]>{
    return this.http.get<Guild[]>(`${this.apiURL}/guild`);
  }

  pesquisarPlayers(nick: string) : Observable<Player[]>{
    let httpParams = new HttpParams().set("nick", nick);
    const url = this.apiURL + "/players/all" + "?" + httpParams.toString();
    return this.http.get<any>(url);
  }

  deletePlayer(player: Player) : Observable<any> {
    return this.http.delete<Player>(`${this.apiURL}/players/${player.id}`)
  }


}
