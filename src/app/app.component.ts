import { Component, AfterContentChecked,ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterContentChecked{
  title = 'tedushop-angular2';
  constructor(private elementRef:ElementRef){
   
  }
 
  ngAfterContentChecked(){
  

  }
}
