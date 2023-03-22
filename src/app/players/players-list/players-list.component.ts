import { AuthService } from './../../auth.service';
import { Component, OnInit } from '@angular/core';
import { PlayersService } from './../../players.service';
import { Player } from './../player';
import { Router } from '@angular/router';

@Component({
  selector: 'app-players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.css']
})
export class PlayersListComponent implements OnInit {

  players: Player[] = [];
  playerSelecionado!: Player;
  nick:string = '';
  role:string = '';
  msgSucesso!: string;
  errors!: string[];
 /*  colunas = ['nick', 'level', 'power', 'qtdCodex', 'cl?a', 'classe'] */

  constructor(
    private service: PlayersService ,
    private authService: AuthService,
    private router: Router ) { 

    }
  

  ngOnInit(): void {
    this.service
    .getPlayers()
    .subscribe(resposta => this.players = resposta);
    this.attRole();
    
  }

  attRole(){
    this.role = this.authService.getRoleAutenticado();
  }
  
  teste(){
    this.service.getPlayers().subscribe(r =>{
      this.players = r;
      console.log(r);
    })
  }
  
  novoCadastro(){
    this.router.navigate(['/players/form'])
  }

  abrirModal(player: Player){
    this.playerSelecionado = player;
  }

  deletarPlayer(player: Player){
    console.log(player)
    return this.service.deletePlayer(player)
    .subscribe(response => { 
      this.msgSucesso = "Player Deletado com sucesso!"
      this.players = response
      setTimeout(() => {
      this.ngOnInit()
      this.msgSucesso = ""
      },3000)
      
    });
    
  }

  pesquisar(nick: string){
    return this.service.pesquisarPlayers(this.nick)
    .subscribe(response => this.players = response);
  }
   

}
