import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

import { MembershipService } from '../../app/core/services/membership.service';
import { UserService } from '../../app/core/services/user.service'

import { NavController, NavParams } from 'ionic-angular';

@Component({
    selector: 'profile',
    templateUrl: 'mainPage.html'
})
export class MainPage {

    user: any;
    photoUrl: string;

    constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage,
        public userService: UserService, public membershipService: MembershipService,) {
        
        this.user = {};
        
        if(!navParams.get('user')) {
            this.storage.get('token')
                .then(data => data)
                .then(token => this.userService.getByToken(token))
                .then(response => response.subscribe(res => {
                    this.user = res.json(); 
                    this.photoUrl = this.userService.getApiHost() + 'images/' + this.user.photo;
                }));
        }
        else {
            this.user = navParams.get('user');
            this.photoUrl = this.userService.getApiHost() + 'images/' + this.user.photo;
            console.log(this.user);
        }

    }
}