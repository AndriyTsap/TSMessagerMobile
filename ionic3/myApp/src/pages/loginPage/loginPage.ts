import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MembershipService } from '../../app/core/services/membership.service';
import { UserService } from '../../app/core/services/user.service'
import { User } from '../../app/core/domain/user';


@Component({
    templateUrl: 'loginPage.html'
})
export class LoginPage {

    constructor(public navCtrl: NavController, public membershipService: MembershipService,
        public storage: Storage, public userService: UserService) {
    }

    error: any;

    login(user: User) {
        //let users = this.userService.getUsers().subscribe(data=>console.log(data));
        console.log(user);
        let creds = this.membershipService.login(user)
            .then(data => {this.storeJWT(data); console.log(data)},
            err => {this.error = err; console.log(err)})
    }

    storeJWT(data: any) {
        this.error = null;
        this.storage.set('_token', data.access_token);
        console.log(this.storage.get('_token'));
    }
}