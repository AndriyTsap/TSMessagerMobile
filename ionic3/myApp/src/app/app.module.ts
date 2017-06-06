import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { IonicStorageModule } from '@ionic/storage'
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
//components
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { LoginPage } from '../pages/loginPage/loginPage';
import { MainPage } from '../pages/mainPage/mainPage';
import { FriendsComponent } from '../pages/friends/friends.component';
//services
import { DataService } from '../app/core/services/data.service'
import { MembershipService } from '../app/core/services/membership.service'
import { UserService } from '../app/core/services/user.service'

@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2,
    LoginPage,
    MainPage,
    FriendsComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    BrowserModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Page2,
    LoginPage,
    MainPage,
    FriendsComponent
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, DataService, UserService, MembershipService]
})
export class AppModule {}
