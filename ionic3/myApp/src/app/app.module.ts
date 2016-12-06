import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Storage } from '@ionic/storage';
//components
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { LoginPage } from '../pages/loginPage/loginPage';
//services
import { DataService } from '../app/core/services/data.service'
import { MembershipService } from '../app/core/services/membership.service'
import { UserService } from '../app/core/services/user.service'

@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2,
    LoginPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Page2,
    LoginPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, DataService, UserService, MembershipService, Storage]
})
export class AppModule {}
