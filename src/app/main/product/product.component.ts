import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { NotificationService } from '../../core/services/notification.service';
import { UtilityService } from '../../core/services/utility.service';
import { AuthenService } from '../../core/services/authen.service';
import { MessageConstants } from '../../core/common/message.constants';
import { SystemConstants } from '../../core/common/system.constants';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { ModalimageComponent } from '../../shared/modalimage/modalimage.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  /*Declare modal */
  @ViewChild('addEditModal') public addEditModal: ModalDirective;
  @ViewChild("thumbnailImage") thumbnailImage;
  @ViewChild(ModalimageComponent) modalImage: ModalimageComponent;

  /*Product manage */
  public baseFolder: string = SystemConstants.BASE_API;
  public entity: any;
  public totalRow: number;
  public pageIndex: number = 1;
  public pageSize: number = 20;
  public pageDisplay: number = 10;
  public filter: string = '';
  public filterCategoryID: number;
  public products: any[];
  public productCategories: any[];
  public ckeditorContent: string = '';
  public checkedItems:any;
  public myCkeditorConfig: any;
  //moreImage
  public imageEntity:any={};
  public productImages:any=[];
  @ViewChild("imageManageModal") imageManageModal;
  @ViewChild("imagePath") imagePath;

  /*Quantity manage */
  public sizeId: number = null;
  public colorId: number = null;
  public colors: any[];
  public sizes: any[];
  @ViewChild('quantityManageModal') public quantityManageModal: ModalDirective;
  public quantityEntity: any = {};
  public productQuantities: any = [];
  public busy: Subscription;

  public uploader:FileUploader = new FileUploader({url: SystemConstants.BASE_API+'api/upload/saveImage?type=product',authToken: "Bearer " + this._authenService.getLoggedInUser().access_token});
  public moreImage:FileUploader = new FileUploader({url: SystemConstants.BASE_API+'api/upload/saveImage?type=product',authToken: "Bearer " + this._authenService.getLoggedInUser().access_token});

  constructor(public _authenService: AuthenService,
    private _dataService: DataService,
    private notificationService: NotificationService,
    private utilityService: UtilityService) {
      
  }

  ngOnInit() {
    this.search();
    this.loadProductCategories();
    this.filterCategoryID = null;
   
  }

  public createAlias() {
    this.entity.Alias = this.utilityService.MakeSeoTitle(this.entity.Name);
  }
  public search() {
    $('.preloader').show();
    this._dataService.get('/api/product/getall?page=' + this.pageIndex + '&pageSize=' + this.pageSize + '&keyword=' + this.filter + '&categoryId=' + this.filterCategoryID)
      .subscribe((response: any) => {
        this.products = response.Items;
        $('.preloader').hide();
        this.pageIndex = response.PageIndex;
      }, error => this._dataService.handleError(error));
  }
  public reset() {
    this.filter = '';
    this.filterCategoryID = null;
    this.search();
  }
  //Show add form
  public showAdd() {
    this.entity = { Content: '' };
    this.addEditModal.show();
  }
  //Show edit form
  public showEdit(id: string) {
    this._dataService.get('/api/product/detail/' + id).subscribe((response: any) => {
      this.entity = response;
      console.log(this.entity)
      this.addEditModal.show();
    }, error => this._dataService.handleError(error));
  }

  public delete(id: string) {
    $('.preloader').show();
    this.notificationService.printConfirmationDialog(MessageConstants.CONFIRM_DELETE_MSG, () => {
      this._dataService.delete('/api/product/delete', 'id', id).subscribe((response: any) => {
        this.notificationService.printSuccessMessage(MessageConstants.DELETE_OK_MSG);
        this.search();
      }, error => this._dataService.handleError(error));
    });
  }

  private loadProductCategories() {
    this._dataService.get('/api/productCategory/getallhierachy').subscribe((response: any[]) => {
      this.productCategories = response;
    }, error => this._dataService.handleError(error));
  }
  //Save change for modal popup
  openImageExplorer(check:any) {
    this.modalImage.showImage(check);
  }


  SaveCompolete(event: any) {
    var str = event.Path + event.NameFullSize;
    var n = str.indexOf("UploadedFiles");
    var string = str.slice(n, str.length);
    if(event.Check=='image'){
      this.entity.ThumbnailImage = string;
    }
    if(event.Check=='editor1'){
      var img = '<img src="'+this.baseFolder+string+'"/>';
      this.entity.Description +=img;
    }
    if(event.Check=='editor2'){
      var img = '<img src="'+this.baseFolder+string+'" />';
      this.entity.Content +=img;
    }
  }
 
  public saveChanges(valid: boolean) {
    $('.preloader').show();
      this.saveData();
  }

  private saveData() {
    if (this.entity.ID == undefined) {
      this._dataService.post('/api/product/add', JSON.stringify(this.entity)).subscribe((response: any) => {
        this.search();
        this.addEditModal.hide();
        this.notificationService.printSuccessMessage(MessageConstants.CREATED_OK_MSG);
      });
    }
    else {
      this._dataService.put('/api/product/update', JSON.stringify(this.entity)).subscribe((response: any) => {
        this.search();
        this.addEditModal.hide();
        this.notificationService.printSuccessMessage(MessageConstants.UPDATED_OK_MSG);
      }, error => this._dataService.handleError(error));
    }
  }
  public pageChanged(event: any): void {
    this.pageIndex = event.page;
    this.search();
  }

 public keyupHandlerContentFunction(e: any) {
    this.entity.Content = e;
  }
 public deleteMulti(){
   this.checkedItems=this.products.filter(x=>x.Checked);
   var checkedIds =[];
   for(var i=0;i<this.checkedItems.length;i++){
      checkedIds.push(this.checkedItems[i]["ID"]);
   }
   this.notificationService.printConfirmationDialog(MessageConstants.CONFIRM_DELETE_MSG, () =>{
    this._dataService.delete('/api/product/deletemulti', 'checkedProducts', JSON.stringify(checkedIds)).subscribe((response: Response) => {
      this.notificationService.printSuccessMessage(MessageConstants.DELETE_OK_MSG);
      this.search();
    }, error => this._dataService.handleError(error));
   })
 } 
 //moreImage
 public showImageManage(id: number) {
  this.imageEntity = {
    ProductId: id
  };
  this.loadProductImages(id);
  this.imageManageModal.show();
}

 public loadProductImages(id: number) {
  $('.preloader').show();
  this._dataService.get('/api/productImage/getall?productId=' + id).subscribe((response: any[]) => {
    this.productImages = response;
    $('.preloader').hide();
  }, error => this._dataService.handleError(error));
}
public deleteImage(id: number) {
  $('.preloader').show();
  this.notificationService.printConfirmationDialog(MessageConstants.CONFIRM_DELETE_MSG, () => {
    this._dataService.delete('/api/productImage/delete', 'id', id.toString()).subscribe((response: any) => {
      this.notificationService.printSuccessMessage(MessageConstants.DELETE_OK_MSG);
      this.loadProductImages(this.imageEntity.ProductId);
    }, error => this._dataService.handleError(error));
  });
}

public saveProductImage(isValid: boolean) {
  $('.preloader').show();
  if (isValid) {
    let fi = this.imagePath.nativeElement;
    if (fi.files.length > 0) {
    this.moreImage.uploadItem(this.moreImage.queue[this.moreImage.queue.length -1]);
        this.moreImage.onSuccessItem = (item: any, response: string, status: number, headers: any): any => {
          if(response){
            this.imageEntity.Path  = response.slice(2,response.length-1)
            this.moreImage.queue=[];
            this._dataService.post('/api/productImage/add', JSON.stringify(this.imageEntity)).subscribe((response: any) => {
              this.loadProductImages(this.imageEntity.ProductId);
              this.notificationService.printSuccessMessage(MessageConstants.CREATED_OK_MSG);
            });
         }
        }
    }
  }
}
/*Quản lý số lượng */
public showQuantityManage(id: number) {
  this.quantityEntity = {
    ProductId: id
  };
  this.loadColors();
  this.loadSizes();
  this.loadProductQuantities(id);
  this.quantityManageModal.show();

}
public loadColors() {
  this._dataService.get('/api/productQuantity/getcolors').subscribe((response: any[]) => {
    this.colors = response;
  }, error => this._dataService.handleError(error));
}
public loadSizes() {
  this._dataService.get('/api/productQuantity/getsizes').subscribe((response: any[]) => {
    this.sizes = response;
  }, error => this._dataService.handleError(error));
}

public loadProductQuantities(id: number) {
  $('.preloader').show();
  this._dataService.get('/api/productQuantity/getall?productId=' + id + '&sizeId=' + this.sizeId + '&colorId=' + this.colorId).subscribe((response: any[]) => {
    this.productQuantities = response;
    $('.preloader').hide();
  }, error => this._dataService.handleError(error));
}

public saveProductQuantity(isValid: boolean) {
  $('.preloader').show();
  if (isValid) {
    this._dataService.post('/api/productQuantity/add', JSON.stringify(this.quantityEntity)).subscribe((response: any) => {
      this.loadProductQuantities(this.quantityEntity.ProductId);
      this.quantityEntity = {
        ProductId: this.quantityEntity.ProductId
      };
      this.notificationService.printSuccessMessage(MessageConstants.CREATED_OK_MSG);
    }, error => this._dataService.handleError(error));
  }
}

 public deleteQuantity(productId: number, colorId: string, sizeId: string) {
  $('.preloader').show();
  var parameters = { "productId": productId, "sizeId": sizeId, "colorId": colorId };
  this.notificationService.printConfirmationDialog(MessageConstants.CONFIRM_DELETE_MSG, () => {
    this._dataService.deleteWithMultiParams('/api/productQuantity/delete', parameters).subscribe((response: any) => {
      this.notificationService.printSuccessMessage(MessageConstants.DELETE_OK_MSG);
      this.loadProductQuantities(productId);
    }, error => this._dataService.handleError(error));
  });
}

}