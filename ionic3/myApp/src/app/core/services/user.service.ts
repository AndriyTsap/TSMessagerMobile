import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable()
export class UserService {

    private _usersAPI: string = 'api/users';

    constructor(public dataService: DataService) { }

    getUsers(){
        this.dataService.set(this._usersAPI);
        return this.dataService.get();
    }
}