import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NotificationService } from '../../core/services/notification.service';
import { UploadService } from '../../core/services/upload.service';
import { MessageConstants } from '../../core/common/message.constants';
import { SystemConstants } from '../../core/common/system.constants';
import { NgForm } from '@angular/forms';
//import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { AuthenService } from './../../core/services/authen.service';
import { IMultiSelectOption, IMultiSelectSettings } from 'angular-2-dropdown-multiselect';
import { ModalimageComponent } from '../../shared/modalimage/modalimage.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @ViewChild('avatar') avatar;
  @ViewChild('modal') public modalAddEdit: ModalDirective;
  @ViewChild(ModalimageComponent) modalImage: ModalimageComponent;
  public busy: Subscription;
  public myRoles: string[] = [];
  public allRoles: IMultiSelectOption[] = [];
  public roles: any[];
  public pageIndex: number = 1;
  public pageSize: number = 99;
  public totalRow: number;
  public filter: string = '';
  public users: any[];
  public entity: any;
  public err: any;
  public searchText: string;
  public baselink: string = SystemConstants.BASE_API;
  //public uploader:FileUploader = new FileUploader({url: SystemConstants.BASE_API+'api/upload/saveImage?type=avatar',authToken: "Bearer " + this._auth.getLoggedInUser().access_token});

  public settings: IMultiSelectSettings = {
    enableSearch: true,
    showCheckAll: true,
    showUncheckAll: true,
    checkedStyle: 'checkboxes',
  };

  public dateOptions: any = {
    locate: { format: 'DD/MM/YYYY' },
    alwaysShowCalendars: false,
    singleDatePicker: true
  }


  constructor(private _dataService: DataService,
    private _uploadService: UploadService,
    private _auth: AuthenService,
    private _notificationService: NotificationService) { }

  ngOnInit() {
    this.loadData();
    this.loadRoles();
  }
  loadData() {
    $('.preloader').show();
    this._dataService.get('/api/appUser/getlistpaging?page=' + this.pageIndex + '&pageSize=' + this.pageSize + '&filter=' + this.filter)
      .subscribe((response: any) => {
        $('.preloader').hide();
        this.users = response.Items;
        this.pageIndex = response.PageIndex;
        this.pageSize = response.PageSize;
        this.totalRow = response.TotalRows;
      });
  }
  loadDetai(id: any) {
    $('.preloader').show();
    this.myRoles = [];
    this._dataService.get('/api/appUser/detail/' + id).subscribe
      ((res: any) => {
        $('.preloader').hide();
        this.entity = res;
        for (let role of this.entity.Roles) {
          this.myRoles.push(role)
        }
        this.entity.BirthDay = moment(new Date(this.entity.BirthDay)).format('DD/MM/YYYY');

      })
  }

  loadRoles() {
    this._dataService.get('/api/appRole/getlistall/').subscribe
      ((res: any[]) => {
        this.allRoles = [];
        for (let role of res) {
          this.allRoles.push({ id: role.Name, name: role.Description })
        }
      }, error => this._dataService.handleError(error));
  }

  pageChanged(e: any): void {
    this.pageIndex = e.page;
    this.loadData();
  }

  showAddModal() {
    this.entity = {};
    this.modalAddEdit.show();
  }
  showEditModal(id: any) {
    this.loadDetai(id);
    this.modalAddEdit.show();
  }
  //Save change for modal popup
  openImageExplorer(check:any) {
    this.modalImage.showImage(check);
  }
  SaveCompolete(event: any) {
    var str = event.Path + event.NameFullSize;
    var n = str.indexOf("/UploadedFiles");
    var string = str.slice(22, str.length);
    this.entity.Avatar = string;
  }

  saveChange(form: NgForm) {
    $('.preloader').show();
    if (form.valid) {
      this.entity.Roles = this.myRoles;
      this.saveData(form);
    }
  }

  saveData(form: NgForm) {
    if (this.entity.Id == undefined) {
      this._dataService.post('/api/appUser/add', JSON.stringify(this.entity))
        .subscribe((res: any) => {
          this.loadData();
          $('.preloader').hide();
          this.modalAddEdit.hide();
          this._notificationService.printSuccessMessage(MessageConstants.CREATED_OK_MSG);
        });
    } else {
      this._dataService.put('/api/appUser/update', JSON.stringify(this.entity))
        .subscribe((res: any) => {
          this.loadData();
          this.modalAddEdit.hide();
          $('.preloader').hide();
          this._notificationService.printSuccessMessage(MessageConstants.UPDATED_OK_MSG);
        });
    }
  }

  deleteItem(id: any) {
    this._notificationService.printConfirmationDialog(MessageConstants.CONFIRM_DELETE_MSG, () => this.deteleItemConfirm(id))
  }
  deteleItemConfirm(id: any) {
    $('.preloader').show();
    this._dataService.delete('/api/appUser/delete', 'id', id).subscribe((response: Response) => {
      this._notificationService.printSuccessMessage(MessageConstants.DELETE_OK_MSG);
      this.loadData();
    })
  }
  public selectGender(event) {
    this.entity.Gender = event.target.value
  }
  public selectedDate(value: any) {
    this.entity.BirthDay = moment(value.end._d).format('DD/MM/YYYY');
  }
}


