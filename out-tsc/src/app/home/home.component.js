import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Auth } from "aws-amplify";
let HomeComponent = class HomeComponent {
    constructor(router, message) {
        this.router = router;
        this.message = message;
        this.isCollapsed = false;
        this.username = 'DC';
    }
    ngOnInit() {
    }
    logout() {
        Auth.signOut()
            .then(response => {
            this.router.navigate(['/login']);
        })
            .catch(error => {
            this.message.create('error', error.message);
        });
    }
};
HomeComponent = __decorate([
    Component({
        selector: 'app-home',
        templateUrl: './home.component.html',
        styleUrls: ['./home.component.css']
    })
], HomeComponent);
export { HomeComponent };
//# sourceMappingURL=home.component.js.map