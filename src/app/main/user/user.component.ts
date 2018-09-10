import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NotificationService } from '../../core/services/notification.service';
import { UploadService } from '../../core/services/upload.service';
import { MessageConstants } from '../../core/common/message.constants';
import { SystemConstants } from '../../core/common/system.constants';
import { NgForm } from '@angular/forms';
import {  FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';

import { AuthenService } from './../../core/services/authen.service';
import { IMultiSelectOption, IMultiSelectSettings } from 'angular-2-dropdown-multiselect';
declare var moment: any;
declare var $: any

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @ViewChild('avatar') avatar;
  @ViewChild('modal') public modalAddEdit: ModalDirective;
  public myRoles: string[] = [];
  public allRoles: IMultiSelectOption[] = [];
  public roles: any[];
  public pageIndex: number = 1;
  public pageSize: number = 4;
  public pageDisplay: number = 1;
  public totalRow: number;
  public filter: string = '';
  public users: any[];
  public entity: any;
  public err: any;
  public searchText: string;
  public baselink: string = SystemConstants.BASE_API;
  public uploader:FileUploader = new FileUploader({url: SystemConstants.BASE_API+'api/upload/saveImage?type=avatar',authToken: "Bearer " + this._auth.getLoggedInUser().access_token});

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
    private _auth:AuthenService,
    private _notificationService: NotificationService) { }

  ngOnInit() {
    this.loadData();
    this.loadRoles();
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
  }
  loadData() {
    this._dataService.get('/api/appUser/getlistpaging?page=' + this.pageIndex + '&pageSize=' + this.pageSize + '&filter=' + this.filter)
      .subscribe((response: any) => {
        this.users = response.Items;
        this.pageIndex = response.PageIndex;
        this.pageSize = response.PageSize;
        this.totalRow = response.TotalRows;
      });
  }
  loadDetai(id: any) {
    this.myRoles = [];
    this._dataService.get('/api/appUser/detail/' + id).subscribe
      ((res: any) => {
        this.entity = res;
        for (let role of this.entity.Roles) {
          this.myRoles.push(role)
        }
        this.entity.BirthDay = moment(new Date(this.entity.BirthDay)).format('DD/MM/YYYY');
        
      })
  }
  loadAvata(){
      var fileName = $(".av").val();
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
 
  saveChange(form: NgForm) {
   
    if (form.valid) {
      let fi = this.avatar.nativeElement;
      this.entity.Roles = this.myRoles;
      if (fi.files.length > 0) {
        this.uploader.uploadAll();
        this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any): any => {
          if(response){
           this.entity.Avatar = response.slice(2,response.length-1);
           this.saveData(form);
           this.loadData();
         }
        }
      }else{
        this.saveData(form);
        this.loadData();
      }
     
    }
  }

  saveData(form: NgForm) {
   
    if (this.entity.Id == undefined) {
      this._dataService.post('/api/appUser/add', JSON.stringify(this.entity))
        .subscribe((res: any) => {
          this.loadData();
          this.modalAddEdit.hide();
          this._notificationService.printSuccessMessage(MessageConstants.CREATED_OK_MSG);
        });


    } else {
      this._dataService.put('/api/appUser/update', JSON.stringify(this.entity))
        .subscribe((res: any) => {
          this.loadData();
          this.modalAddEdit.hide();
          this._notificationService.printSuccessMessage(MessageConstants.UPDATED_OK_MSG);
        });
    }
  }

  deleteItem(id: any) {
    this._notificationService.printConfirmationDialog(MessageConstants.CONFIRM_DELETE_MSG, () => this.deteleItemConfirm(id))
  }
  deteleItemConfirm(id: any) {
    this._dataService.delete('/api/appUser/delete', 'id', id).subscribe((response: Response) => {
      this._notificationService.printSuccessMessage(MessageConstants.DELETE_OK_MSG);
      this.loadData();
    })
  }
  public selectGender(event) {
    this.entity.Gender = event.target.value
  }
  public selectedDate(value: any) {
    this.entity.BirthDay =  moment(value.end._d).format('DD/MM/YYYY');
  }
}


