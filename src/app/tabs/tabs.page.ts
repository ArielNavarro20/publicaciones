import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  router: any;

  constructor() {}

    // Navigate to Tab 2
    goToTab2() {
      this.router.navigate(['/tabs/tab2']);
    }

}
