import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { Shell } from '@app/shell/shell.service';

const routes: Routes = [
  Shell.childRoutes([
    { path: 'about', loadChildren: () => import('./pages/about/about.module').then((m) => m.AboutModule) },
  ]),

  { path: 'item/:itemID', loadChildren: () => import('./pages/lists/lists.module').then((m) => m.ListsModule) },

  // Fallback when no prior route is matched
  { path: '**', redirectTo: 'tabs/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
