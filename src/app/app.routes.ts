import {RouterModule, Routes} from '@angular/router';

import {ExamplesComponent} from './+examples/examples.component';

const routes: Routes = [
	{ path: 'examples', component: ExamplesComponent},
	{ path: '**', pathMatch: 'full', redirectTo: '/examples'}
];

export const routing = RouterModule.forRoot(routes, {useHash: true});
