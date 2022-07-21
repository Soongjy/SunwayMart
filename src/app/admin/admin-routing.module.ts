import { NgModule} from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from "../product/product.component";
import { AdminComponent } from "./admin.component";

import { AdmindashboardComponent } from "./admindashboard/admindashboard.component";
import { AdminpanelComponent } from "./adminpanel/adminpanel.component";
import { ManageCategoriesComponent } from "./manage-categories/manage-categories.component";
import { ManageCompanyProfileComponent } from "./manage-company-profile/manage-company-profile.component";
import { ManageProductComponent } from "./manage-product/manage-product.component";
import { ManageUserComponent } from "./manage-user/manage-user.component";
import { ManageImageComponent } from "./manage-image/manage-image.component";
import { ManageAdminComponent } from "./manage-admin/manage-admin.component";

const routes: Routes = [
    {
        path: '', component: AdminComponent,
        children: [
            { path: '', component: AdmindashboardComponent },
            { path: 'manage-images', component: ManageImageComponent},
            { path: 'manageproduct', component: ManageProductComponent},
            { path: 'manageuser', component: ManageUserComponent},
            { path: 'manageadmin', component: ManageAdminComponent},
            { path: 'managecategories', component: ManageCategoriesComponent},
            { path: 'manage-company-profile', component: ManageCompanyProfileComponent},
        ],
        
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })


export class AdminRoutingModule{}