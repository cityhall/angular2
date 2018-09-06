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
    var s= document.createElement("script");
    s.type="text/javascript";
    s.src="/assets/js/custom.js";
      this.elementRef.nativeElement.appendChild(s);

  }
}
