import { Storage } from '@ionic/storage';
import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';
import { UserService } from '../../app/core/services/user.service';
import { MainPage } from '../mainPage/mainPage';

@Component({
    selector: 'friends',
    templateUrl: 'friends.component.html'
})

export class FriendsComponent {

    friends = [];
    token: string;

    constructor(private storage: Storage, private userService: UserService,
        private navCtrl: NavController) {
        this.storage.get('token')
            .then(data => this.getFriends(0, data).subscribe(res => this.friends = res.json()));
    }

    getFriends(offset: number, token: string) {
        return this.userService.getFriends(token, offset);
    }

    userSelected(id) {
        this.userService.getById(id)
            .subscribe(user => this.navCtrl.push(MainPage, {user: user.json()}));
    }
}