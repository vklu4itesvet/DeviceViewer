import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `<div class="row mt-5">
  <div class="col-4">
    <h1>Probeaufgabe</h1>
  </div>
  <div class="col-4">
    <h1>- Dmitriy Matviiets -</h1> 
  </div>
  <div class="col-4">
    <h1>{{testDate | date: 'dd-MM-yyyy'}}</h1>
    </div>
  </div>`
})
export class HeaderComponent {
    testDate = new Date(2022, 2, 12);
}