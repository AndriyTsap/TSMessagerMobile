import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MembershipService } from '../../app/core/services/membership.service';
import { UserService } from '../../app/core/services/user.service'
import { User } from '../../app/core/domain/user';
import { Registration } from '../../app/core/domain/registration';

@Component({
    templateUrl: 'loginPage.html'
})
export class LoginPage {

    constructor(public navCtrl: NavController, public membershipService: MembershipService,
        public storage: Storage, public userService: UserService) {
    }

    error: any;
    authType: string = "login";


    login(user: User) {
        this.membershipService.login(user)
            .then(data => {this.storeJWT(data);
                this.storage.set('user', user.Username);},
            err => {this.error = err; console.log(err)})
    }

    signup(creds: Registration){
        this.membershipService.register(creds)
            .then(data => console.log(data),
            err => console.log(err))
    }

    storeJWT(data: any) {
        this.error = null;
        let token = JSON.parse(data);
        this.storage.set('token', token.access_token);
        this.storage.get('token').then(data => console.log(data));
    }
}