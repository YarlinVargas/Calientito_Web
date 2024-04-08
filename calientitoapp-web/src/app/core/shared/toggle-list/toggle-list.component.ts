import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import { faListUl, faGripVertical, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { ToggleListEnum } from '../../models/enums/toggleList.enum';
import { TootilpOption } from '../../models/tooltip-options.model';

@Component({
  selector: 'app-toggle-list',
  templateUrl: './toggle-list.component.html',
  styleUrls: ['./toggle-list.component.scss']
})
export class ToggleListComponent {

  @Input({
      required: false,
  }) public sizeIcons: SizeProp = '2x';

  @Input({
    required: false,
    alias: 'vistaActual'
  }) public openView: ToggleListEnum = ToggleListEnum.TABLE;

  @Output() public changeView: EventEmitter<ToggleListEnum> = new EventEmitter<ToggleListEnum>();

  public allOptions = ToggleListEnum;
  public faListUl: IconDefinition = faListUl
  public faGripVertical: IconDefinition = faGripVertical;
  public currentView: ToggleListEnum = this.openView;
  public defaultOptionsTooltip: TootilpOption = {
    enable: true,
    placement: 'left',
    showDelay: 0,
    hideDelay: 0
  }

  constructor() { }

  public toggleView (newView: ToggleListEnum){
    this.currentView = newView;
    this.changeView.emit(newView);
  }

}
