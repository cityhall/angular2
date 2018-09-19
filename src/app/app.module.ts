import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { AuthGuard } from './core/guards/auth.guard';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { HttpClientModule } from '@angular/common/http';
import { UtilityService } from '../app/core/services/utility.service';
import { CkeditorConfigService } from '../app/core/services/ckeditor.service';
import { AuthenService } from '../app/core/services/authen.service';
import { DataService } from '../app/core/services/data.service';
import { SignalrService } from '../app/core/services/signalr.service';
import { NotificationService } from '../app/core/services/notification.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    RouterModule.forRoot(appRoutes, { useHash: false }),
    PaginationModule.forRoot()
  ],

  providers: [AuthGuard, UtilityService,SignalrService, AuthenService, DataService, NotificationService,CkeditorConfigService],
  bootstrap: [AppComponent]
})
export class AppModule { }