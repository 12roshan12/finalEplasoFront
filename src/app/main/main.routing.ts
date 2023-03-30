import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogPreviewComponent } from './blog-preview/blog-preview.component';
import { BlogComponent } from './blog/blog.component';
import { LandingPageComponent } from './landing/landing-page/landing-page.component';
import { MainComponent } from './main.component';

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            { path: '', component: LandingPageComponent },
            {
                path: 'dashboard',
                loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
            },
            { path: 'home', component: LandingPageComponent },
            { path: 'blog', component: BlogComponent },
            { path: 'blog-preview/:id', component: BlogPreviewComponent },
            {
                path: 'package',
                loadChildren: () => import('./jobs/jobs.module').then(m => m.JobsModule)
            },
            {
                path: 'profile',
                loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)
            },
            { path: 'dashboard', redirectTo: 'home', pathMatch: 'full' },
        ]
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainRoutingModule { }
