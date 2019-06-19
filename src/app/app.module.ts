import { FormsModule } from '@angular/forms';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { SquareComponent } from './square/square.component';

const firebaseConfig = {
  apiKey: 'AIzaSyASJQL84JvI0ngwrqgD-e5nBNgy8ukARYY',
  authDomain: 'tictacfire-87b86.firebaseapp.com',
  databaseURL: 'https://tictacfire-87b86.firebaseio.com',
  projectId: 'tictacfire-87b86',
  storageBucket: 'tictacfire-87b86.appspot.com',
  messagingSenderId: '1022238920459',
  appId: '1:1022238920459:web:4e36a3fd4337e548'
};

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    SquareComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
