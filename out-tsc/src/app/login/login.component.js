import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { Auth } from "aws-amplify";
let LoginComponent = class LoginComponent {
    constructor(fb, message, router) {
        this.fb = fb;
        this.message = message;
        this.router = router;
        this.isSpinning = false;
    }
    submitForm() {
        this.isSpinning = true;
        for (const i in this.validateForm.controls) {
            this.validateForm.controls[i].markAsDirty();
            this.validateForm.controls[i].updateValueAndValidity();
        }
        Auth.signIn(this.validateForm.value.email, this.validateForm.value.password)
            .then(response => {
            this.isSpinning = false;
            this.router.navigate(['/home']);
        })
            .catch(error => {
            this.message.create('error', error.message);
            this.isSpinning = false;
        });
    }
    ngOnInit() {
        this.validateForm = this.fb.group({
            email: [null, [Validators.required, Validators.email]],
            password: [null, [Validators.required]],
            remember: [true]
        });
    }
};
LoginComponent = __decorate([
    Component({
        selector: 'app-login',
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.css']
    })
], LoginComponent);
export { LoginComponent };
//# sourceMappingURL=login.component.js.map