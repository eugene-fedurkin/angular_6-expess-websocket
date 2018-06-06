import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChatComponent } from './components/chat.component/chat.component';
import { RegisterComponent } from './components/register.comonent/register.component';

const routes: Routes = [
  { path: '', redirectTo: 'register',  pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'chat', component: ChatComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
