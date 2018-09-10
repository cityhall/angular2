import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { SystemConstants } from '../../core/common/system.constants';
import { UtilityService } from './utility.service';
import { FileUploader,FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import { AuthenService } from './../../core/services/authen.service';

@Injectable()
export class UploadService {
  public responseData: any;
  public option = {url: SystemConstants.BASE_API + '/api/upload/saveImage', authToken: "Bearer " + this._auth.getLoggedInUser().access_token };
  public uploader: FileUploader = new FileUploader(this.option);

  constructor(private dataService: DataService, private utilityService: UtilityService,private _auth:AuthenService,) { }

  postWithFile(url: string, postData: any) {
  
    var returnReponse = new Promise((resolve, reject) => {
      this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any): any => {

        if(response){
          this.responseData = response;
          resolve(this.responseData);
       }
      }
    });
    return returnReponse;
  }
}