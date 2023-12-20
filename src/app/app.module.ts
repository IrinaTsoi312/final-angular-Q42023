import { InputInvalidStyleDirective } from './directives/InputValidStyle.directive';
import { NgModule, isDevMode } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule, provideRouter, withComponentInputBinding } from "@angular/router";
import { MdbFormsModule } from "mdb-angular-ui-kit/forms";
import { MdbRippleModule } from "mdb-angular-ui-kit/ripple";
import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HeaderComponent } from "./features/header/header.component";
import { MainComponent } from "./pages/main/main.component";
import { SearchResultComponent } from "./pages/search-result/search-result.component";
import { FilterComponent } from "./features/filter/filter.component";
import { LoginComponent } from "./pages/login/login.component";
import { NotfoundComponent } from "./pages/notfound/notfound.component";
import { DetailsComponent } from "./pages/details/details.component";
import { authGuard } from "./Guard/auth.guard";
import { AdminComponent } from './pages/admin/admin.component';
import { FavoriteComponent } from "./pages/favorite/favorite.component";
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { cardsReducer } from './store/new-card.reducer';
import { collectionReducer } from './store/new-card.store';

const routeConfig: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full"
  },
  {
    path: "login",
    component: LoginComponent,
    title: "Login Page"
  },
  {
    path: "result",
    component: SearchResultComponent,
    title: "Search Result",
    // canActivate: [authGuard]
  },
  {
    path: "details/:id",
    component: DetailsComponent,
    title: "Details",
    // canActivate: [authGuard]
  },
  {
    path: "admin",
    component: AdminComponent,
    title: "Admin",
    // canActivate: [authGuard]
  },
  {
    path: "favorite",
    component: FavoriteComponent,
    title: "Favorite",
    // canActivate: [authGuard]
  },
  {
    path: "**",
    component: NotfoundComponent,
    title: "Not found"
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    SearchResultComponent,
    FilterComponent,
    LoginComponent,
    NotfoundComponent,
    DetailsComponent,
    FavoriteComponent,
    AdminComponent,
    InputInvalidStyleDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    CommonModule,
    MdbFormsModule,
    ReactiveFormsModule,
    MdbRippleModule,
    HttpClientModule,
    RouterModule.forRoot(routeConfig),
    StoreModule.forRoot({ cards: cardsReducer, collection: collectionReducer }),
    StoreDevtoolsModule.instrument({
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
      connectInZone: true
    }),
  ],
  providers: [
    provideRouter(routeConfig, withComponentInputBinding())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
