import { Routes } from '@angular/router';
import { Homepage } from './homepage/homepage';
import { ErrorPage } from './error-page/error-page';
import { Gallery } from './gallery/gallery';
import { Prospectus } from './prospectus/prospectus';
import { Notices } from './notices/notices';
import { Contact } from './contact/contact';
import { AboutUs } from './about-us/about-us';
import { Achievements } from './achievements/achievements';
import { Form } from './form/form';
export const routes: Routes = [
    {path: 'homepage',component:Homepage},
    {path: 'prospectus',component:Prospectus},
    {path: 'notices',component:Notices},
    {path: 'contact',component:Contact},
    {path: 'about-us',component:AboutUs},
    {path: 'achievements',component:Achievements},
    {path: 'gallery',component:Gallery},
    {path: 'form',component:Form},
    {path: '', component:Homepage},
    {path: '**' , component:ErrorPage},
];