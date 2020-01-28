import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import {
  TimelineViewsService, ResizeService, DragAndDropService, EventSettingsModel,
  ScheduleComponent, ActionEventArgs
} from '@syncfusion/ej2-angular-schedule';
import { scheduleData } from './data';
import { extend } from '@syncfusion/ej2-base';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [TimelineViewsService, ResizeService, DragAndDropService]
})
export class AppComponent {
  @ViewChild('schedule', null) scheduleObj: ScheduleComponent;
  public data: object[] = extend([], scheduleData, null, true) as object[];
  public selectedDate: Date = new Date(2018, 1, 15);
  public views: object[] = [{ option: 'TimelineWeek', interval: 4 }];
  public eventSettings: EventSettingsModel = { dataSource: this.data };
  public flag = true;

  onActionBegin(args: ActionEventArgs): void {
    if (args.requestType === 'toolbarItemRendering') {
      const arg = args as any;
      const item0 = arg.items[0];
      const item1 = arg.items[1];
      item1.align = 'right';
      // Getting date range text
      let item2 = arg.items[2];
      const dateRangeText = {
        align: 'center',
        text: item2.text,
        cssClass: 'e-custom'
      };
      item2 = dateRangeText;
      // Rearranging the toolbar items
      arg.items[0] = item0;
      arg.items[1] = item2;
      arg.items[2] = item1;
    }
  }

  // Updating date range text on initial loading
  onDataBinding(): void {
    if (this.flag) {
      this.dateRangetext();
      this.flag = false;
    }
  }

  // Updating date range text on navigating
  onActionComplete(args: ActionEventArgs): void {
    if (args.requestType === 'dateNavigate') {
      this.dateRangetext();
    }
  }


  public dateRangetext(): void {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const startDate = (this.scheduleObj.getCurrentViewDates()[0] as Date);
    const endDate = this.scheduleObj.getCurrentViewDates()[this.scheduleObj.getCurrentViewDates().length - 1] as Date;
    const startYear = startDate.getFullYear() === endDate.getFullYear() ? '' : ', ' + startDate.getFullYear();
    const startTxt = '' + monthNames[startDate.getMonth()] + ' ' + startDate.getDate() + '' + startYear + ' -';
    const endTxt = ' ' + monthNames[endDate.getMonth()] + ' ' + endDate.getDate() + ', ' + endDate.getFullYear();
    (document.querySelector('.e-toolbar-item.e-custom') as HTMLElement).innerText = startTxt + endTxt;
  }
}
