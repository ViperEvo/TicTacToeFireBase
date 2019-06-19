import { SquareComponent } from './../square/square.component';
import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  constructor() { }

  get status(){
    return this.winner ? 'Winner: ' + this.winner : 'Current player: ' + this.player;
  }
  squares = Array(9).fill(null);
  player = 'X';
  winner = '';

  @Output() winnerEmit = new EventEmitter<string>();

  newGame() {
    if (this.player === 'X')
    {
      this.player = 'X';
    }
    else
    {
      this.player = 'O';
    }
    this.squares = Array(9).fill(null);
    this.winner = null;
  }

  makeMove(position) {
    if (!this.winner && !this.squares[position]){
      this.squares[position] = this.player;
      if (this.winMove()){
        this.winner = this.player;
        this.winnerEmit.emit(this.player);
      }
      this.player = this.player === 'X' ? 'O' : 'X';
    }
  }

  winMove(): boolean {
    const lines = [
      [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]
    ];
    for (let line of lines) {
      if (this.squares[line[0]] && this.squares[line[0]] === this.squares[line[1]] && this.squares[line[1]] === this.squares[line[2]])
      { return true;}
    }
    return false;
  }

  ngOnInit() {

  }
}
