// Copyright (C) 2016 Sergey Akopkokhyants
// This project is licensed under the terms of the MIT license.
// https://github.com/akserg/ng2-slim-loading-bar

import {Component, Input, OnInit} from '@angular/core';

import {SlimLoadingBarService, SlimLoadingBarEvent, SlimLoadingBarEventType} from './loader.service';
import {isPresent} from './loader.utils';

/**
* A Slim Loading Bar component shows message loading progress bar on the top of web page or parent component.
*/
@Component({
  moduleId: module.id.toString(),
  selector: 'ng2-slim-loading-bar',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class SlimLoadingBarComponent implements OnInit {

  private progressEl:HTMLDivElement;

  private _progress: string = '0%';
  @Input() set progress(value: string) {
    if (isPresent(value)) {
      this._progress = value + '%';
    }
  }
  get progress(): string {
    return this._progress;
  }

  @Input() color: string = '#00b5dc';
  @Input() height: string = '2px';
  @Input() show: boolean = true;

  constructor(private service:SlimLoadingBarService) {}

  ngOnInit(): any {
    this.service.observable.subscribe((event:SlimLoadingBarEvent) => {
      if (event.type === SlimLoadingBarEventType.PROGRESS) {
        this.progress = event.value;
      } else if (event.type === SlimLoadingBarEventType.COLOR) {
        this.color = event.value;
      } else if (event.type === SlimLoadingBarEventType.HEIGHT) {
        this.height = event.value;
      } else if (event.type === SlimLoadingBarEventType.VISIBLE) {
        this.show = event.value;
      }
    });
  }
}
