import { BoardComponent } from './board/board.component';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

interface Score {
  winner: string;
  time: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  scoreCol: AngularFirestoreCollection<Score>;
  scores: Observable<Score[]>;

  constructor(private afs: AngularFirestore) {
  }

  ngOnInit() {
    this.scoreCol = this.afs.collection('Scores');
    this.scores = this.scoreCol.valueChanges();
  }
  addScore(winner) {
    this.afs.collection('Scores').add({'winner': winner, 'time': '0'});
  }
}
