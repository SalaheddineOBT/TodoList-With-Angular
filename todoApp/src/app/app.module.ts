import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TodoComponent } from './pages/todo/todo.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { NoFoundComponent } from './pages/no-found/no-found.component';
import { DragDropModule} from '@angular/cdk/drag-drop';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatIconModule } from '@angular/material/icon';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar'

@NgModule({
    declarations: [
        AppComponent,
        TodoComponent,
        LoginComponent,
        RegisterComponent,
        ProfileComponent,
        NoFoundComponent,
        NavbarComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        DragDropModule,
        BrowserAnimationsModule,
        NgbModule,
        MatIconModule,
        MatToolbarModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
