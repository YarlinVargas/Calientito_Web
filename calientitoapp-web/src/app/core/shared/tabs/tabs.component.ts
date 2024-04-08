import { Component} from '@angular/core';
import { faBuilding, faUserGroup, faGear } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent {
  openTab = 1;
  faBuilding = faBuilding;
  faUserGroup = faUserGroup;
  faGear = faGear;
  toggleTabs($tabNumber: number) {
    this.openTab = $tabNumber;
    sessionStorage.setItem('openTab', this.openTab.toString());
  }

}
