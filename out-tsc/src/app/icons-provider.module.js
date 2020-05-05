import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { NZ_ICONS, NzIconModule } from 'ng-zorro-antd/icon';
import { MenuFoldOutline, MenuUnfoldOutline, FormOutline, DashboardOutline } from '@ant-design/icons-angular/icons';
const icons = [MenuFoldOutline, MenuUnfoldOutline, DashboardOutline, FormOutline];
let IconsProviderModule = class IconsProviderModule {
};
IconsProviderModule = __decorate([
    NgModule({
        imports: [NzIconModule],
        exports: [NzIconModule],
        providers: [
            { provide: NZ_ICONS, useValue: icons }
        ]
    })
], IconsProviderModule);
export { IconsProviderModule };
//# sourceMappingURL=icons-provider.module.js.map