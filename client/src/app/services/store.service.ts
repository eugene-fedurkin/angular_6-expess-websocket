import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserModel } from '../models/user.model';

@Injectable()
export class StoreService {

  private user: UserModel;
  public userSubject: BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>(this.user);
  public get state$(): Observable<UserModel> {
    return this.userSubject.asObservable();
  }

  public saveName(name: string, avatar: string): void {
    if (!this.user) {
      this.user = new UserModel(name, avatar);
    } else {
      this.user.name = name;
    }

    this.userSubject.next(this.user);
  }
}
