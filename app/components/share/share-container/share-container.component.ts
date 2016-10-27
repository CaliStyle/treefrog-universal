import { Component, Inject, Input, OnInit, ViewEncapsulation, trigger, state, style, transition, animate}
from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Properties } from '../properties.utils'

@Component({
  selector: 'share-container',
  templateUrl: './share-container.component.html',
  styleUrls: ['./share-container.component.scss'],
  animations: [
    trigger('expandedState', [
      state('expanded', style({
        width:'*',
        height:'*'
      })),
      state('collapsed', style({
        width:'0',
        height:'0'
      })),
      transition('collapsed <=> expanded', animate('200ms ease-in'))
    ])
  ]
})
export class ShareContainerComponent implements OnInit{
  // Primary platforms that appear
  @Input() platforms = ['twitter', 'facebook'];
  // Secondary Platforms that appear when expanded
  @Input() secondaryPlatforms =  ['googlePlus','reddit','pinterest', 'linkedin'];
  // Wether or not the component is expendable
  @Input() expandable:boolean = true;
  // tells if the text must be enabled on primary platforms
  @Input() textEnabled:boolean = false;
  // Text added to the vanilla message, ex: 'your creation' will result in
  // 'Tweet your creation' for twitter or 'Share your creation' for fb
  @Input() addedText:string;
  // This should be set up directly in the meta tags as this is good practice
  // Use this input only if you have multiple content to share per url.
  // So in case you need this the input should be like the following object (you can omitt some fields)
  // {title:'my title', description:'my desc',img:' an image', via:'Ced_VDB', hashtags:'someHashTag'}
  @Input() properties:Properties = {};
  // horizontal layout or vertical layout (_accessed via getter & setter)
  _direction:string = 'horizontal';
  // state of the secondary platform expandable pannel
  expandedState:string = "collapsed";

  metaTags: any[];

  constructor(
    @Inject(DOCUMENT) private document: any
  ) {
    this.metaTags = this.document.head.children;
  }

  ngOnInit(){
    this.fetchProperties();
  }

  expand(){
    this.expandedState = (this.expandedState == 'collapsed' ? 'expanded' : 'collapsed');
  }

  fetchProperties(){
    this.properties.url = this._getMetaContent('og:url') || this._tryWindowLocation();
    this.properties.title = this.properties.title || this._getMetaContent('og:title') || this.document.title;
    this.properties.description = this.properties.description || this._getMetaContent('og:description');
    this.properties.image = this.properties.image || this._getMetaContent('og:image');
    this.properties.via = this.properties.via || this._getMetaContent('n2s:via');
    this.properties.hashtags = this.properties.hashtags || this._getMetaContent('n2s:hashtags');
  }

  private _tryWindowLocation() {
    try {
      return window.location.href.toString()
    }
    catch(err) {
        return ''
    }
  }

  private _getMetaContent(property: string) {
    // let elem = document.querySelector(`meta[property='${property}']`);
    // if (elem && typeof elem.getAttribute == 'function') {
    //   console.log(elem)
    //   return elem.getAttribute("content");
    // }
    // return "";
    let value;
    let len = this.metaTags.length;
    for (let i = 0; i < len; i++) {
      let element = this.metaTags[i];

      // console.log(property, element.attribs)

      if (element.attribs && element.attribs[property] && element.attribs.content){
        value = element.attribs.content;
        break;
      }
    }
    return value || false;
  }

  // safe check to prevent missuses
  @Input()
  set direction(direction){
    if(direction === 'vertical')
    this._direction = direction;
    else
    this._direction = 'horizontal';
  }

  get direction(){
    return this._direction;
  }
}
