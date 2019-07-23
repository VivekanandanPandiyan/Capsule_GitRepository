import { RouterModule, Routes } from '@angular/router'

import { AppComponent } from './app.component';

import { AddComponent } from './UI/add/add.component';
import { EditComponent } from './UI/edit/edit.component';
import { ViewComponent } from './UI/view/view.component';

export const appRoutes: Routes = [
    { path: '', component: AddComponent },
    { path: 'add', component: AddComponent },
    { path: 'edit', component: EditComponent },
    { path: 'view', component: ViewComponent }
]