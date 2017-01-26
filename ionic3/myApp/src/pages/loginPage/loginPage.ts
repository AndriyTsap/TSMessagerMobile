import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MembershipService } from '../../app/core/services/membership.service';
import { UserService } from '../../app/core/services/user.service'
import { User } from '../../app/core/domain/user';
import { Registration } from '../../app/core/domain/registration';

@Component({
    templateUrl: 'loginPage.html'
})
export class LoginPage {
    loginForm: FormGroup;
    signupForm: FormGroup;
    error: any;
    user: User = { Username: "", Password: "", RememberMe: false };
    username: string;
    authType: string = "login";

    constructor(public navCtrl: NavController, public membershipService: MembershipService,
        public storage: Storage, public userService: UserService, public formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.signupForm = this.formBuilder.group(this.initSignupModel());
        this.loginForm = this.formBuilder.group(this.initLoginModel());
    }

    initLoginModel() {
        const model = {
            'Username': ['', [Validators.required]],
            'Password': ['', [Validators.required]],
            'RememberMe': ['', []]
        };

        return model;
    }

    initSignupModel() {

        const passwordRegex = '(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,}';

        const model = {
            'Username': ['', [Validators.required]],
            'Email': ['', [Validators.required]],
            'Passwords': this.formBuilder.group({
                Password: ['', [Validators.required, Validators.pattern(passwordRegex)]],
                ConfirmPassword: ['', Validators.required]
            }, { validator: this.areEqual })
        };

        return model;
    }

    areEqual(group: any) {
        var valid = false;
        
        if(!(group.controls['Password'].value===group.controls['ConfirmPassword'].value)){
            valid=true;
        }

        if (!valid) {
            return null;
        }

        return {
            areEqual: true
        };
    }

    login() {
        this.membershipService.login(this.user)
            .then(data => {
                this.storeJWT(data);
                this.storage.set('user', this.user.Username);
                this.username = this.user.Username
            },
            err => { this.error = err; console.log(err) })
    }

    signup(creds: Registration) {
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

    logout() {

    }
}