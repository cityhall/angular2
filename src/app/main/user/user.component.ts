import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NotificationService } from '../../core/services/notification.service';
import { MessageConstants } from '../../core/common/message.constants';
import { IMultiSelectOption,IMultiSelectSettings } from 'angular-2-dropdown-multiselect';
declare var moment:any;
declare var $:any

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

 
  @ViewChild('modal') public modalAddEdit: ModalDirective;
  public myRoles :string[]=[];
  public allRoles : IMultiSelectOption[]=[];
  public roles:any[];
  public pageIndex: number = 1;
  public pageSize: number = 4;
  public pageDisplay: number = 1;
  public totalRow: number;
  public filter: string = '';
  public users: any[];
  public entity: any;
  public searchText: string;

  public settings: IMultiSelectSettings = {
    enableSearch: true,
    showCheckAll: true,
    showUncheckAll: true,
    checkedStyle:'checkboxes',
  };

  public dateOptions:any ={
    locate:{format:'DD/MM/YYYY'},
    alwaysShowCalendars:false,
    singleDatePicker:true
  }
  constructor(private _dataService: DataService, private _notificationService: NotificationService) { }

  ngOnInit() {
    this.loadData();
    this.loadRoles();
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
    this.myRoles=[];
    this._dataService.get('/api/appUser/detail/' + id).subscribe
      ((res: any) => {
        this.entity = res;
        for(let role of this.entity.Roles){
          this.myRoles.push(role)
        }
        this.entity.BirthDay =  moment(new Date(this.entity.BirthDay)).format('DD/MM/YYYY');
      })
  }
  loadRoles() {
    this._dataService.get('/api/appRole/getlistall/').subscribe
      ((res: any[]) => {
        this.allRoles = [];
        for(let role of res){
          this.allRoles.push({id:role.Name,name:role.Description})
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
  saveChange(valid: boolean) {
    if (valid) {
      if (this.entity.Id == undefined) {
        this._dataService.post('/api/appUser/add', JSON.stringify(this.entity))
          .subscribe((res: any) => {
            this.loadData();
            this.modalAddEdit.hide();
            this._notificationService.printSuccessMessage(MessageConstants.CREATED_OK_MSG);
          }, error => this._dataService.handleError(error));


      } else {
        this._dataService.put('/api/appUser/update', JSON.stringify(this.entity))
          .subscribe((res: any) => {
            this.loadData();
            this.modalAddEdit.hide();
            this._notificationService.printSuccessMessage(MessageConstants.UPDATED_OK_MSG);
          }, error => this._dataService.handleError(error));
      }
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
  public selectGender(e){
    this.entity.Gender = e.target.value;
  }
}


