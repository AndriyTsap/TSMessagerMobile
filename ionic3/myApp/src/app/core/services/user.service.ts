import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable()
export class UserService {

    private _usersAPI: string = 'api/user';
    private _userGetByIdAPI: string = 'api/user/getById?id=';
    private _userGetByTokenAPI: string = 'api/user/getByToken';
    private _userDelete: string = 'api/user/delete';
    private _friendsGetAPI: string = 'api/user/friends?offset=';
    private _searchAPI: string = 'api/user/search?username=';
    private _searchFriendsAPI: string = 'api/users/friend/search?username=';
    private _uploadPhotoAPI: string = "api/photos/upload";

    constructor(public dataService: DataService) { }

    getApiHost() {
        return this.dataService.getApiHost();
    }

    getUsers(){
        this.dataService.set(this._usersAPI);
        return this.dataService.get();
    }

    public getFriends(token: string, offset: number) {
        this.dataService.set(this._friendsGetAPI + offset);
        return this.dataService.getAuthenticate(token)
    }

    public getById(id: number) {

        this.dataService.set(this._userGetByIdAPI + id);
        return this.dataService.get();;
    }

    public getByToken(token: string) {
        this.dataService.set(this._userGetByTokenAPI);
        return this.dataService.getAuthenticate(token);
    }

    // public update(token: string, user: UserFull) {

    //     this.dataService.set(this._userEditPersonalDataAPI);
    //     return this.dataService.putAuthenticate(token, user);;
    // }

    public delete(token: string) {

        this.dataService.set(this._userDelete);
        return this.dataService.delete(token);
    }

    public uploadPhoto(photo: any) {
        this.dataService.set(this._uploadPhotoAPI);
        return this.dataService.upload(photo);
    }

    public search(username: string) {
        this.dataService.set(this._searchAPI + username);
        return this.dataService.get();
    }

    public searchFriends(username: string, token: string) {
        this.dataService.set(this._searchFriendsAPI + username);
        return this.dataService.getAuthenticate(token);
    }

    public checkOnFriendship(token: string, id: number) {
        this.dataService.set(this._searchAPI + id);
        return this.dataService.getAuthenticate(token);
    }
}