import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { RouterModule, Routes } from '@angular/router'
import { AppComponent } from './app.component';
import { AddComponent } from './UI/add/add.component';
import { EditComponent } from './UI/edit/edit.component';
import { ViewComponent } from './UI/view/view.component';
import { appRoutes } from './app.routes';
import { TaskServiceService } from './Service/task-service.service'
import { HttpModule } from '@angular/http'

@NgModule({
  declarations: [
    AppComponent,
    AddComponent,
    EditComponent,
    ViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [TaskServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
