import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { IonicStorageModule } from '@ionic/storage-angular';


import { SQLiteService } from './services/sqlite.service';
import { PublicationService } from './services/publication.service';


import { DeleteConfirmationModalComponent } from './delete-confirmation-modal/delete-confirmation-modal.component'; // Ajusta la ruta si es necesario

@NgModule({
  declarations: [
    AppComponent,
    DeleteConfirmationModalComponent 
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot()
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    SQLiteService,
    PublicationService
  ],
  bootstrap: [AppComponent],

})
export class AppModule {}
