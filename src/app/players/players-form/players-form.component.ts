import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Route, ActivatedRoute, Router, Params } from '@angular/router';
import { Player } from '../player';
import { PlayersService } from '../../players.service';
import { Classe } from './../classe';
import { Guild } from '../guild';

@Component({
  selector: 'app-players-form',
  templateUrl: './players-form.component.html',
  styleUrls: ['./players-form.component.css']
})
export class PlayersFormComponent implements OnInit {

  player!: Player;
  success: boolean = false;
  errors!: String[];
  id!: number;
  classes: Classe[] = [];
  guilds: Guild[] = [];
  opcoes= [
    {id: true, descricao: 'Sim'},
    {id: false, descricao: 'Nao'},
  ]
  constructor( 
    private service: PlayersService,
    private router: Router,
    private activatedRoute: ActivatedRoute ) {
      this.player = new Player();
   }

  ngOnInit(): void {
       this.getPlayer();
       this.getCla();
       this.getClasse();
  }

  teste(): void{
    console.log(this.player)
    console.log('chamou')
  }

  getCla(): void {
    this.service
    .getClas()
    .subscribe( response => {
      this.guilds = response;
    })
  }

  getClasse(): void {
    this.service
    .getClasses()
    .subscribe( response => {
      this.classes = response;
    })
  }

  getPlayer(): void {
    let params : Observable<Params> = this.activatedRoute.params;
    params.subscribe( urlParams =>{
      this.id = urlParams['id'];
      if(this.id){
        this.service
        .getPlayerById(this.id)
        .subscribe( response => this.player = response,
          errorResponse => this.player = new Player()
          )
      }
    })
  }

  onSubmit(){
    if(this.id){
      this.service
      .atualizar(this.player)
      .subscribe(response =>{
        this.success = true;
        this.errors = [];
        setTimeout(()=> {
          this.router.navigate(['/players-list'])
        }, 3000)
      }, errorResponse =>{
        this.errors = ['Erro ao atualizar o player']
        setTimeout(()=> {
          this.router.navigate(['/players-list'])
        }, 3000)
      }
      )
    }else{
      this.service
      .salvar(this.player)
      .subscribe( response => {
        this.success=true;
        this.errors=[];
        setTimeout(() =>{
          this.success=false;
          this.player = new Player()
        },3000)
      }, errorResponse => {
        this.success= false;
        this.errors = errorResponse.error.errors;
        setTimeout(() =>{
          this.ngOnInit()
          this.errors=[];
        },3000)
      })
    }
  }

  voltar(){
    this.router.navigate(['/players/list'])
 }
}
