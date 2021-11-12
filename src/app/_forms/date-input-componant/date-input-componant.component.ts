import { Component, Input,  Optional,  Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input-componant.component.html',
  styleUrls: ['./date-input-componant.component.css']
})
export class DateInputComponant implements ControlValueAccessor {

  @Input() label: string;
  @Input() maxDate: Date;
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(@Optional() @Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
    
    this.bsConfig = {
      containerClass: "theme-red",
      dateInputFormat: "DD MMMM YYYY"
    }
   }
  writeValue(obj: any): void {
   }
  registerOnChange(fn: any): void {
   }
  registerOnTouched(fn: any): void {
   }

 

}
