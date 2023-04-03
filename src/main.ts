import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent, AppModule } from './app/app.component';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

// bootstrapApplication(AppComponent, {
//   providers: [
//     { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
//     importProvidersFrom(IonicModule.forRoot({})),
//   ],
// });


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
