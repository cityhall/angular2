import { Component, OnInit, ViewChild, Output, EventEmitter, ViewChildren, Input } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { DataService } from '../../core/services/data.service';
import { NotificationService } from '../../core/services/notification.service';
import { MessageConstants } from '../../core/common/message.constants';
import { SystemConstants } from '../../core/common/system.constants';
import { AuthenService } from '../../core/services/authen.service';
import { UtilityService } from '../../core/services/utility.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FileUploader, FileUploaderOptions, FileItem } from 'ng2-file-upload';

@Component({
  selector: 'modalimage',
  templateUrl: './modalimage.component.html',
  styleUrls: ['./modalimage.component.css']
})
export class ModalimageComponent implements OnInit {

  public baseFolder: string = SystemConstants.BASE_API;
  @ViewChild('modalAddEdit') public modalAddEdit: ModalDirective;
  @ViewChild('modalFolder') public modalFolder: ModalDirective;
  @ViewChild('modalFile') public modalFile: ModalDirective;
  @Output() SaveCompolete: EventEmitter<any> = new EventEmitter();
  @Output() OnHidden: EventEmitter<any> = new EventEmitter();
  public maxSize: number = 99;
  public pageIndex: number = 1;
  public pageSize: number = 10;
  public filter: string = '';
  public totalRow: number;
  public listFolders: any[];
  public Folder: any = {};
  public ParentFolder: any;
  public entityFolder: any;
  public busy: Subscription;
  public listFileEdit: any[];
  public listFiles: any[];
  public listFileImage: any[];
  public ImgSelect: any = {};
  public FparentId: any;
  public Check: any;
  public listFolderselect: any;

  public uploader: FileUploader = new FileUploader({});
  private uploaderOptions: FileUploaderOptions = {};
  public hasBaseDropZoneOver: boolean = false;

  constructor(private _dataService: DataService, private _notificationService: NotificationService,
    public _authenService: AuthenService, private _utilityService: UtilityService) {
  }

  ngOnInit() {
    this.setUploadFile();
  }

  loadFolder() {
    this._dataService.get('/api/folder/getall')
      .subscribe((response: any[]) => {
        this.Folder = {};
        this.listFolders = this.BuildTree(response);
        this.listFolderselect = this.BuildTreeAll(response);
        if (this.listFolders.length > 0) {
          this.Folder = this.listFolders[0];
          this.loadFile();
        }
      }, error => this._dataService.handleError(error));
  }

  loadFile() {
    this._dataService.get('/api/file/getlistpaging?idFolder=' + this.Folder.Id)
      .subscribe((response: any) => {
        this.listFileImage = response.Items;
      
        this.pageIndex = response.PageIndex;
        this.pageSize = response.PageSize;
        this.totalRow = response.TotalRows;
        // console.log(response);
      }, error => this._dataService.handleError(error));
  }

  showImage(check:any) {
    this.Check=check;
    this.loadFolder();
    this.modalAddEdit.show();
  }

  onShow() {

  }

  handler() {
    this.OnHidden.emit(true);
  }

  showAddFolder() {
    this.entityFolder = {};
    this.entityFolder.ParentId ='';
    this.modalFolder.show();
  }
  selectparent(){
    this.entityFolder.ParentId = this.FparentId;
    debugger

  }

  treeOptions = {
    isExpandedField: 'expanded',
    idField: 'Id'
  }
  onInitialized(tree) {
    setTimeout(() => {
      tree.treeModel.focusNextNode();
      let node = tree.treeModel.getFocusedNode()
      if (node) {
        node.toggleActivated(true);
      }
    }, 1);

  }

  SelectFolder(event) {
    this.Folder = event.node.data;
    this.loadFile();
  }

  UnSelectFolder(event) {

  }

  saveChangeFolder(form: NgForm) {
    if (form.valid) {
      if (this.entityFolder.Id == undefined) {
        this.busy = this._dataService.post('/api/folder/add', JSON.stringify(this.entityFolder))
          .subscribe((response: any) => {
            this.modalFolder.hide();
            form.resetForm();
            this._notificationService.printSuccessMessage(MessageConstants.CREATED_OK_MSG);
            this.loadFolder();
          }, error => this._dataService.handleError(error));
      }
      else {
        this.busy = this._dataService.put('/api/folder/update', JSON.stringify(this.entityFolder))
          .subscribe((response: any) => {
            this.modalFolder.hide();
            form.resetForm();
            this._notificationService.printSuccessMessage(MessageConstants.UPDATED_OK_MSG);
            this.loadFolder();
          }, error => this._dataService.handleError(error));
      }
    }
  }

  SaveChaged() {
    let entity: any = {};
    entity.Name = this.ImgSelect.Name;
    entity.Path = this.baseFolder + this.ImgSelect.Path;
    entity.NameFullSize = this.ImgSelect.NameFullSize;
    entity.NameThumb = this.ImgSelect.NameThumb;
    entity.Check = this.Check;
    this.SaveCompolete.emit(entity);
    this.modalAddEdit.hide();
  }

  BuildTree = (arr: any[]): any[] => {
    let roots: any[] = [];
    roots = arr.filter(x => x.ParentId == null);
    for (var i = 0; i < roots.length; i++) {
      this.Tree(arr, roots[i]);
    }
    return roots;
  }
  BuildTreeAll = (arr: any[]): any[] => {
    let roots: any[] = [];
    roots = arr;
    for (var i = 0; i < roots.length; i++) {
      this.Tree(arr, roots[i]);
    }
    return roots;
  }

  Tree(arr: any[], list: any) {
    let childs = arr.filter(x => x.ParentId == list.Id);
    list.expanded = true;
    list.children = childs;
    for (var i = 0; i < childs.length; i++) {
      this.Tree(arr, childs[i]);
    }
  
  }

  showUploadFile() {
    this.listFileEdit = [];
    this.uploader.queue = [];
    this.modalFile.show();
  }

  saveChangeFile(form: NgForm) {
    if (this.uploader.queue.length > 0) {
      this.uploader.options.additionalParameter = { type: "file", folder: this.Folder.Id };
      this.uploader.uploadAll();
    }
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  removeFileEdit(item) {
    let index = this.listFileEdit.findIndex(x => x.Id == item);
    if (index > -1) {
      this.listFileEdit.splice(index, 1);
    }
  }

  removeFile(item) {
    this.uploader.removeFromQueue(item);
    if (this.uploader.queue.filter(x => x.isSuccess == false).length > 0) {
    }
    else {
      this.listFiles = [];
      for (let item of this.uploader.queue) {
        this.listFiles.push({ File: item._xhr.response.replace(/"/gi, ''), FileName: item.file.name })
      }
    }
  }

  private setUploadFile() {
    this.uploaderOptions.url = this.baseFolder + '/api/file/UploadFile';
    let authHeader: any[] = [];
    authHeader.push({ name: 'Authorization', value: 'Bearer ' + this._authenService.getLoggedInUser().access_token });
    this.uploaderOptions.headers = authHeader;
    this.uploader.setOptions(this.uploaderOptions);

    this.uploader.onErrorItem = (item: any, response: any, status: any, headers: any) => {
      this._notificationService.printErrorMessage(response);
    };
    this.uploader.onCompleteAll = () => {
      if (this.uploader.queue.filter(x => x.isSuccess == false).length > 0) {
      }
      else {
        this.listFiles = [];
        for (let item of this.uploader.queue) {
          this.listFiles.push({ File: item._xhr.response.replace(/"/gi, ''), FileName: item.file.name })
        }
        this.modalFile.hide();
        // this.loadFile();
      }
    };
  }

  SelectImage(event: any) {
    this.listFileImage.forEach(item => {
      item.Checked = false;
    });
    event.Checked = true;
    this.ImgSelect = event;
  }

  DbClickImage(event) {
    this.SaveChaged();
  }

  DeleteImage() {
    if (this.ImgSelect.Id) {
      this._notificationService.printConfirmationDialog(MessageConstants.CONFIRM_DELETE_MSG, () => this.deleteItemConfirm(this.ImgSelect.Id));
    }
    else {
      this._notificationService.printErrorMessage(MessageConstants.SYSTEM_ERROR_MSG);
    }
  }

  deleteItemConfirm(id: string) {
    this.busy = this._dataService.delete('/api/file/delete', 'id', id).subscribe((response: Response) => {
      this._notificationService.printSuccessMessage(MessageConstants.DELETE_OK_MSG);
      this.ImgSelect = {};
      this.loadFile();
    });
  }

  deleteFolder(data) {
    if(data.children.length>0){
      this._notificationService.printErrorMessage('Yêu cầu xóa hết thư mục con trước!');
    }
    else{
      if(this.listFileImage.length>0){
        this._notificationService.printErrorMessage('Yêu cầu xóa hết ảnh trong thư mục trước!');
  
      }else{
        this._notificationService.printConfirmationDialog(MessageConstants.CONFIRM_DELETE_MSG, () => this.deleteFolderConfirm(data.Id));
      }
    }
  }

  deleteFolderConfirm(id: string) {
    this.busy = this._dataService.delete('/api/folder/delete', 'id', id).subscribe((response: Response) => {
      this._notificationService.printSuccessMessage(MessageConstants.DELETE_OK_MSG);
      this.loadFolder();
    });
  }
}
