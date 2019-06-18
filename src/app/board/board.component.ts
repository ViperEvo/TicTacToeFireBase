import { SquareComponent } from './../square/square.component';
import { Component, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  constructor() { }
  squares = Array(9).fill(null);

  makeMove(position){
    console.log(position);
  }

  ngOnInit() {

  }
}
