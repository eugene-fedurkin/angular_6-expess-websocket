import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Register } from '../../models/register.model';
import { HttpService } from '../../services/http.service';
import { SocketService } from '../../services/socket.service';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public userName: string = '';
  public mod: string = '';

  constructor(
    private readonly http: HttpService,
    private readonly store: StoreService,
    private readonly router: Router,
    private readonly socket: SocketService,
  ) {}

  public toggleSignIn(): void {
    this.mod = 'SignIn';
  }

  public toggleSignUp(): void {
    this.mod = 'SignUp';
  }

  public onSignUp(): any {
    const subsc: Subscription = this.http.signUp(new Register(this.userName))
      .subscribe(res => {
        this.store.saveName(res.name, res.avatar);
        this.router.navigate(['chat']);
        this.socket.emitJoinEvent(res.name);
        subsc.unsubscribe();
      });
  }

  public onSignIn(): void {
    const subsc: Subscription = this.http.signIn(new Register(this.userName))
      .subscribe(res => {
        this.store.saveName(res.name, res.avatar);
        this.router.navigate(['chat']);
        this.socket.emitJoinEvent(res.name);
        subsc.unsubscribe();
      });
  }
}
