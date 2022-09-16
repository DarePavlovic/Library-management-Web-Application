import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AdminComponent } from './admin/admin.component';
import { BookPageComponent } from './book-page/book-page.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ModeratorComponent } from './moderator/moderator.component';
import { RegisterComponent } from './register/register.component';
import { SearchComponent } from './search/search.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { UserComponent } from './user/user.component';
import { ChangePassComponent } from './userC/change-pass/change-pass.component';

const routes: Routes = [
  {path:"", component:HomeComponent},
  {path:"home", component:HomeComponent},
  {path:"login", component:LoginComponent},
  {path:"user", component:UserComponent},
  {path:"change", component:ChangePassComponent},
  {path:"admin", component:AdminComponent},
  {path:"register", component:RegisterComponent},
  {path:"adminPage", component:AdminPageComponent},
  {path:"search", component:SearchComponent},
  {path:"userUpdate", component:UserUpdateComponent},
  {path:"userProfile", component:UserProfileComponent},
  {path:"moderator",component:ModeratorComponent},
  {path:"bookPage", component:BookPageComponent},
  {path:"**", component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
