import { Component, OnInit, NgZone } from '@angular/core';
import { SystemConstants } from '../core/common/system.constants';
import { UrlConstants } from '../core/common/url.constants';
import { UtilityService } from '../core/services/utility.service';
import { AuthenService } from '../core/services/authen.service';
import { LoggedInUser} from '../core/domain/loggedin.user';
import { SignalrService,  } from '../core/services/signalr.service';
import { DataService, } from '../core/services/data.service';
import {OrderBy} from "./../core/filter/orderBy.pipe"

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css',],
})
export class MainComponent implements OnInit {
  public user :LoggedInUser;
  public baseFolder: string = SystemConstants.BASE_API;
  public canSendMessage: Boolean;
  public annoucements: any[];

  constructor(private utilityService: UtilityService,private authenService:AuthenService,
    private _dataService:DataService,
    private _ngZone:NgZone,
    private _signalRService:SignalrService) { 
       // this can subscribe for events  
      this.subscribeToEvents();
      // this can check for conenction exist or not.  
      this.canSendMessage = _signalRService.connectionExists;
    }

  ngOnInit() {
    new runjs();
    this.user =JSON.parse(localStorage.getItem(SystemConstants.CURRENT_USER));
    this.loadAnnouncements();
  }
  private subscribeToEvents(): void {

    var self = this;
    self.annoucements = [];

    // if connection exists it can call of method.  
    this._signalRService.connectionEstablished.subscribe(() => {
      this.canSendMessage = true;
    });

    // finally our service method to call when response received from server event and transfer response to some variable to be shwon on the browser.  
    this._signalRService.announcementReceived.subscribe((announcement: any) => {
      this._ngZone.run(() => {
        announcement.CreatedDate = moment(moment(announcement.CreatedDate).format("DDMMYYYY"), "DDMMYYYY").fromNow();
        self.annoucements.push(announcement);
      });
    });
  }

  markAsRead(id: number) {
    var body = { announId: id };
    this._dataService.get('/api/Announcement/markAsRead?announId=' + id.toString()).subscribe((response: any) => {
      if (response) {
        this.loadAnnouncements();
      }
    });
  }

  private loadAnnouncements() {
    this._dataService.get('/api/Announcement/getTopMyAnnouncement').subscribe((response: any) => {
      this.annoucements = [];
      for (let item of response) {
        item.CreatedDate = moment(moment(new Date(item.CreatedDate)).format('MMMM Do YYYY, h:mm:s a'), 'MMMM Do YYYY, h:mm:s a').fromNow();
        this.annoucements.push(item);
      }

    });
  }

  logout() {
    
    localStorage.removeItem(SystemConstants.CURRENT_USER);
    this.utilityService.navigate(UrlConstants.LOGIN);
  }
}
