import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Registration } from '../domain/registration';
import { User } from '../domain/user';

@Injectable()
export class UserService {

    private _usersAPI: string = 'api/users';

    constructor(public dataService: DataService) { }

    getUsers(){
        this.dataService.set(this._usersAPI);
        return this.dataService.get();
    }
}