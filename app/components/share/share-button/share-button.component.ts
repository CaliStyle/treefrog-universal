import { Component, Input, OnInit, trigger, state, style, transition, animate } from '@angular/core';
import { Platform, platforms } from '../platforms.utils'
import { Properties } from '../properties.utils'

// a test comment switching cvs

@Component({
  selector: 'share-button',
  templateUrl: './share-button.component.html',
  styleUrls:['./share-button.component.scss']
})
export class ShareButtonComponent implements OnInit{
  @Input() platformName;
  platform:Platform;
  @Input() textEnabled: boolean;
  @Input() addedText:string;
  @Input() direction:string = 'horizontal';
  @Input() properties:Properties;
  url:string;


  ngOnInit(){
    this.platform = platforms[this.platformName];
    this.constructUrl();
  }

  click(event){
    window.open(this.url, 'newwindow', 'width=1070, height=600');
    event.preventDefault();
  }

  constructUrl(){
    this.url = this.platform.url + this.properties.url;
    if(this.platform.properties){
      for(let key in this.platform.properties){
        // if the property has been found.
        let val = this.properties[this.platform.properties[key]];
        if (val) {
          this.url += `&${key}=${val}`;
        }
      }
    }
  }
}
