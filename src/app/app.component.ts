import { BoardComponent } from './board/board.component';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

interface Score {
  winner: string;
  xsecs: string;
  xtenths: string;
  osecs: string;
  otenths: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  scoreCol: AngularFirestoreCollection<Score>;
  scores: Observable<Score[]>;
  fData = null;
  winner = null;
  xsecs = null;
  xtenths = null;
  osecs = null;
  otenths = null;
  constructor(private afs: AngularFirestore) {
  }

  ngOnInit() {
    this.scoreCol = this.afs.collection('Scores');
    this.scores = this.scoreCol.valueChanges();
  }
  addScore(fireJson) {
    console.log(fireJson);
    this.fData = JSON.parse(fireJson);
    console.log(this.fData['xSecs']);

    this.afs.collection('Scores').add({'winner': this.fData['Winner'], 'xsecs': this.fData['xSecs'], 'xtenths': this.fData['xTenths'], 'osecs': this.fData['oSecs'], 'otenths': this.fData['oTenths']});
  }
}
