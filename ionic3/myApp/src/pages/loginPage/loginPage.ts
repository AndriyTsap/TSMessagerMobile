import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormGroup, FormBuilder, FormControl, Validators} from "@angular/forms";
import { MembershipService } from '../../app/core/services/membership.service';
import { UserService } from '../../app/core/services/user.service'
import { User } from '../../app/core/domain/user';
import { Registration } from '../../app/core/domain/registration';

@Component({
    templateUrl: 'loginPage.html'
})
export class LoginPage {
    loginForm: FormGroup;
    error: any;
    user: User = {Username: "", Password: "", RememberMe: false};
    username: string;
    authType: string = "login";

    constructor(public navCtrl: NavController, public membershipService: MembershipService,
        public storage: Storage, public userService: UserService, public formBuilder: FormBuilder) {
    }

    ngOnInit(){
        //this.storage.get('user').then(data => this.username = data);
        this.loginForm = this.formBuilder.group({
            'Username': ['', [Validators.required]],
            'Password': ['', [Validators.required, Validators.minLength(8)]],
            'RememberMe': ['', []]
        });
    }

    userNameValidator(control: FormControl){

    }

    login() {
        this.membershipService.login(this.user)
            .then(data => {this.storeJWT(data);
                this.storage.set('user', this.user.Username);
                this.username = this.user.Username},
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

    logout(){

    }
}