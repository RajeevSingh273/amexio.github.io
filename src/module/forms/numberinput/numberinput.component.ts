/*
 Component Name : Amexio Number Input
 Component Selector :  <amexio-number-input>
 Component Description : Number input component has been created with different configurable attributes for validation (min/max value, allow blank, custom regex), custom error message, help, custom styles
*/
import {Component, forwardRef, Input,Output,EventEmitter} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

const noop = () => {
};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AmexioNumberInputComponent), multi: true
};

@Component({
  selector: 'amexio-number-input',
  templateUrl: './numberinput.component.html',
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
  styleUrls: ['./numberinput.component.scss']
})
export class AmexioNumberInputComponent implements ControlValueAccessor {

   /*
Properties 
name : field-label
datatype : string
version : 4.0 onwards
default : none 
description : The label of this field
*/
  @Input('field-label') fieldlabel: string;
  /*
Properties 
name : allow-blank
datatype : string
version : 4.0 onwards
default : none 
description : Sets if field is required
*/
  @Input('allow-blank') allowblank: boolean;
  /*
Properties 
name : min-value
datatype : number
version : 4.0 onwards
default : none 
description : defines the min range limit for number input.
*/
  @Input('min-value') minvalue: number;
  /*
Properties 
name : max-value
datatype : number
version : 4.0 onwards
default : none 
description : defines the max range limit for number input.
*/
  @Input('max-value') maxvalue: number;

  helpInfoMsg: string;

  regEx: RegExp;

  showToolTip: boolean;

  _errormsg: string;

  get errormsg(): string {
    return this._errormsg;
  }
/*
Properties 
name : error-msg
datatype : none
version : 4.0 onwards
default : none
description : sets the error message
*/ 
  @Input('error-msg')
  set errormsg(value: string) {
    this.helpInfoMsg = value + '<br/>';
  }

  _minerrormsg: string;

  get minerrormsg(): string {
    return this._minerrormsg;
  }
/*
Properties 
name : min-error-msg
datatype : string
version : 4.0 onwards
default : none
description : sets the error message for min validation
*/ 
  @Input('min-error-msg')
  set minerrormsg(value: string) {
    this.helpInfoMsg = this.helpInfoMsg + 'Min value: ' + value + '<br/>';
  }

  _maxerrormsg: string;

  get maxerrormsg(): string {
    return this._maxerrormsg;
  }

/*
Properties 
name : max-error-msg
datatype : string
version : 4.0 onwards
default : none
description : sets the error message for max validation
*/   
  @Input('max-error-msg')
  set maxerrormsg(value: string) {
    this.helpInfoMsg = this.helpInfoMsg + 'Max value: ' + value;
  }

  isValid: boolean;

  isComponentValid : boolean;
   /*
Properties 
name : place-holder
datatype : string
version : 4.0 onwards
default : none 
description : 	Show place-holder inside dropdown component
*/
  @Input('place-holder') placeholder: string;
   /*
Properties 
name : min-length
datatype : number
version : 4.0 onwards
default : none 
description : The smallest positive representable number -that is, the positive number closest to zero (without actually being zero). The smallest negative representable number is -min-length.
*/
  @Input('min-length') minlength: number;
   /*
Properties 
name : max-length
datatype : number
version : 4.0 onwards
default : none 
description : The smallest positive representable number -that is, the positive number closest to zero (without actually being zero). The smallest negative representable number is -max-length.
*/
  @Input('max-length') maxlength: number;

/*
Properties 
name : disabled
datatype : boolean
version : 4.0 onwards
default : none 
description : true to disable the field.
*/
  @Input() disabled: boolean;
  /*
Properties 
name : icon-feedback
datatype : boolean
version : 4.0 onwards
default : none 
description : 
*/
  @Input('icon-feedback') iconfeedback: boolean;
  /*
Properties 
name : font-style
datatype : string
version : 4.0 onwards
default : none 
description : Set font-style to field
*/
  @Input('font-style') fontstyle: string;
  /*
Properties 
name : font-family
datatype : string
version : 4.0 onwards
default : none 
description : Set font-family to field
*/
  @Input('font-family') fontfamily: string;
  /*
Properties 
name : font-size
datatype : string
version : 4.0 onwards
default : none 
description : Set font-size to field
*/
  @Input('font-size') fontsize: string;
  /*
Properties 
name : has-label
datatype : boolean
version : 4.0 onwards
default : none 
description : flag to set label
*/
  @Input('has-label') haslabel: boolean = true;

  _pattern: string;

  get pattern(): string {
    return this._pattern;
  }
  /*
Properties 
name : pattern
datatype : string
version : 4.0 onwards
default : none 
description : Apply Reg-ex to the field
*/
  @Input('pattern')
  set pattern(value: string) {
    if (value != null) this.regEx = new RegExp(this.pattern);
  }
    /*
Events
name : input
datatype : any
version : none
default : none
description : 	On input event field.
*/ 
@Output() input: any = new EventEmitter<any>();

  /*
Properties 
name : enable-popover
datatype : string
version : 4.0 onwards
default : none 
description : Set enable / disable popover.
*/
  @Input('enable-popover') enablepopover: boolean;

  constructor() {
    this.showToolTip = false;
  }

  // The internal dataviews model
  private innerValue: any = '';

  //Placeholders for the callbacks which are later provided
  //by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  //get accessor
  get value(): any {
    return this.innerValue;
  }

  //set accessor including call the onchange callback
  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
    }
  }

  //Set touched on blur
  onBlur() {
    this.onTouchedCallback();
    this.showToolTip = false;
    if (this.value < this.minvalue) {
      this.isValid = false;
    } else {
      this.isValid = true;
    }
  }
  ngOnInit() {
    this.isComponentValid = this.allowblank;
  }
    
  onInput(input:any) {    
    this.isComponentValid = input.valid;
    this.input.emit();
  }

  onFocus() {
    this.showToolTip = true;
  }

  //From ControlValueAccessor interface
  writeValue(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }

  //From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  //From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  getValidationClasses(inp: any): any {
    let classObj;
    if (inp.touched && !this.allowblank && (this.value == '' || this.value == null)) {
      classObj = {'input-control-error': true};
      //this.helpInfoMsg = this.helpInfoMsg + 'This field is manditory ! ';
      this.isValid = false;
    } else if (inp.touched && this.minvalue != null && this.maxvalue != null) {
      if (this.value < this.minvalue || this.value > this.maxvalue) {
        classObj = {'input-control-error': true};
        this.isValid = false;
      } else {
        this.isValid = true;
      }
    } else if (inp.touched && this.minvalue != null && this.maxvalue == null) {
      if (this.value < this.minvalue) {
        classObj = {'input-control-error': true};
        this.isValid = false;
      } else {
        this.isValid = true;
      }
    } else if (inp.touched && this.minvalue == null && this.maxvalue != null) {
      if (this.value > this.maxvalue) {
        classObj = {'input-control-error': true};
        this.isValid = false;
      } else {
        this.isValid = true;
      }
    } else {
      classObj = {
        'input-control-error': inp.invalid && (inp.dirty || inp.touched),
        'input-control-success': inp.valid && (inp.dirty || inp.touched)
      };
      if (inp.valid && (inp.dirty || inp.touched)) this.isValid = true;
    }
    return classObj;
  }

}



