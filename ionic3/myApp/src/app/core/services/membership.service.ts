import { URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Registration } from '../domain/registration';
import { User } from '../domain/user';
import { Storage } from '@ionic/storage';

@Injectable()
export class MembershipService {

    private _accountRegisterAPI: string = 'api/account/register/';
    private _accountLoginAPI: string = 'token';
    private _accountLogoutAPI: string = 'api/account/logout/';

    constructor(public accountService: DataService, public storage: Storage) { }

    register(newUser: Registration) {

        this.accountService.set(this._accountRegisterAPI);
        let headers = [{ header: 'Content-Type', value: 'application/json' }];
        return this.accountService.post(JSON.stringify(newUser), headers);
    }

    login(creds: User) {
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('username', creds.Username);
        urlSearchParams.append('password', creds.Password);
        let body = urlSearchParams.toString();
        let headers = [{ header: 'Content-Type', value: 'application/x-www-form-urlencoded' }];
        this.accountService.set(this._accountLoginAPI);
        return this.accountService.post(body, headers);
    }

    logout() {
        this.accountService.set(this._accountLogoutAPI);
        return this.accountService.post(null, null);
    }

    isUserAuthenticated(): boolean {
        var _token = this.storage.get('token');
        if (_token != null)
            return true;
        else
            return false;
    }

    getLoggedInUser(): User {
        var _user: User;

        if (this.isUserAuthenticated()) {
            var _userData = JSON.parse(localStorage.getItem('user'));
            _user = new User(_userData.Username, _userData.Password);
        }

        return _user;
    }
}