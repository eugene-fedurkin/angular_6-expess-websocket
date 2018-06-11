import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { ChatComponent } from './components/chat.component/chat.component';
import { DialogComponent } from './components/dialog.component/dialog.component';
import { MessageComponent } from './components/message.component/message.component';
import { RegisterComponent } from './components/register.comonent/register.component';
import { ImageLoaderDirective } from './directives/img-loader.directive';
import { MaterialModule } from './material.module/material.module';
import { HttpService } from './services/http.service';
import { SocketService } from './services/socket.service';
import { StoreService } from './services/store.service';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    ChatComponent,
    MessageComponent,
    DialogComponent,
    ImageLoaderDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ScrollToModule.forRoot(),
  ],
  providers: [
    SocketService,
    HttpService,
    StoreService,
   ],
  entryComponents: [DialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
