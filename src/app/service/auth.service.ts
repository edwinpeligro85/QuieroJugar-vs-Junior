import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { map } from 'rxjs/operators';
import { RegisterModel } from '../components/register/register.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth) { }

  isAuth() {
    return this.afAuth.authState.pipe(map(auth => auth));
  }

  getCurrentUser() {
    return this.afAuth.authState.pipe(map(auth => auth)).subscribe(auth => auth);
  }

  loginUser(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, pass)
      .then(userData => resolve(userData), err => reject(err));
    });
  }

  loginGoogleUser() {
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth.auth
      .signInWithPopup(provider)
      .then(res => {
        resolve(res);
      });
    });
  }

  loginFacebookUser() {
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.FacebookAuthProvider();
      provider.addScope('user_name');
      provider.addScope('user_lastname');
      this.afAuth.auth
      .signInWithPopup(provider)
      .then(res => {
        resolve(res);
      }, err => {
        console.log(err);
        reject(err);
      });
    });
  }

  registerUser(value: RegisterModel) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.inputCorreo, value.inputPass)
      .then(res => {
        resolve(res);
      }, err => reject(err));
    });
  }

  logoutUser() {
    return this.afAuth.auth.signOut();
  }
}
