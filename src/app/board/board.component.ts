import { SquareComponent } from './../square/square.component';
import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { JsonPipe } from '@angular/common';


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
  xTime = 0;
  xRunning = 0;
  xSecs = 0;
  xTenths = 0;
  oTime = 0;
  oRunning = 0;
  oSecs = 0;
  oTenths = 0;
  fireJson = '';
  fireData = null;
  @Output() winnerEmit = new EventEmitter<string>();

  newGame() {
    if (this.player === 'X')
    {
      this.player = 'X';
    } else
    {
      this.player = 'O';
    }
    this.squares = Array(9).fill(null);
    this.winner = null;
    this.xTime = 0;
    this.xRunning = 0;
    this.xSecs = 0;
    this.xTenths = 0;
    this.oTime = 0;
    this.oRunning = 0;
    this.oSecs = 0;
    this.oTenths = 0;
    document.getElementById('playerXTime').innerHTML = 'X player timer : ' +  this.xSecs + ':' + this.xTenths;
    document.getElementById('playerOTime').innerHTML = 'O player timer : ' +  this.oSecs + ':' + this.oTenths;
  }

  makeMove(position) {
    if (!this.winner && !this.squares[position]){
      this.squares[position] = this.player;
      if (this.winMove()){
        this.winner = this.player;
        this.oRunning = 0;
        this.xRunning = 0;
        this.oTimerStartPause();
        this.xTimerStartPause();
        this.fireData = { Winner : this.player, xSecs : this.xSecs, xTenths : this.xTenths, oSecs : this.oSecs, oTenths : this.oTenths};
        this.fireJson = JSON.stringify(this.fireData);
        this.winnerEmit.emit(this.fireJson);
      }
      this.player = this.player === 'X' ? 'O' : 'X';
      if (this.player === 'X')
      {
        this.oRunning = 1;
        this.oTimerStartPause();
        this.xTimerStartPause();
      } else
      {
        this.xRunning = 1;
        this.xTimerStartPause();
        this.oTimerStartPause();
      }
    }
  }
  xTimerStartPause() {
    if (this.xRunning === 0) {
      this.xRunning = 1;
      this.xIncrement();
    } else
    {
      this.xRunning = 0;
    }
  }
  xIncrement() {
    setTimeout(() => {
      if (this.xRunning === 1)
      {
        this.xTime += 1;
        this.xSecs = Math.floor(this.xTime / 10);
        this.xTenths = this.xTime % 10;
        document.getElementById('playerXTime').innerHTML = 'X player timer : ' +  this.xSecs + ':' + this.xTenths;
        this.xIncrement();
      }
    }, 100);
  }
  oTimerStartPause() {
    if (this.oRunning === 0) {
      this.oRunning = 1;
      this.oIncrement();
    } else
    {
      this.oRunning = 0;
    }
  }
  oIncrement() {
    setTimeout(() => {
      if (this.oRunning === 1)
      {
        this.oTime += 1;
        this.oSecs = Math.floor(this.oTime / 10);
        this.oTenths = this.oTime % 10;
        document.getElementById('playerOTime').innerHTML = 'O player timer : ' + this.oSecs + ':' + this.oTenths;
        this.oIncrement();
      }
    }, 100);
  }

  winMove(): boolean {
    const lines = [
      [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]
    ];
    for (const line of lines) {
      if (this.squares[line[0]] && this.squares[line[0]] === this.squares[line[1]] && this.squares[line[1]] === this.squares[line[2]]) { return true; }
    }
    return false;
  }

  ngOnInit() {
  }
}
