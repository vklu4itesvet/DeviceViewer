import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `<div class="row mt-5">
  <div class="col-sm col-md-3">
    <h3>Probeaufgabe</h3>
  </div>
  <div class="col-sm col-md-6">
    <h3>- Dmitriy Matviiets -</h3> 
  </div>
  <div class="col-sm col-md-3">
    <h3>{{testDate | date: 'dd-MM-yyyy'}}</h3>
    </div>
  </div>`
})
export class HeaderComponent {
  testDate = new Date(2022, 2, 13);
}
