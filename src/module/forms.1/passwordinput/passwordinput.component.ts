/*
 Component Name : Amexio Email Input
 Component Selector :  <amexio-email-input>
 Component Description : Email input field 
*/
import {Component, EventEmitter, forwardRef, Input, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

const noop = () => {
};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AmexioPasswordComponent), multi: true
};

@Component({
  selector: 'amexio-password-input',
  templateUrl: './passwordinput.component.html',
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
  styleUrls: ['./passwordinput.component.scss']
})
export class AmexioPasswordComponent implements ControlValueAccessor {

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
name : allow-blank
datatype : string
version : 4.0 onwards
default : none 
description : sets if field is required
*/
  @Input('allow-blank') allowblank: boolean;

  helpInfoMsg: string;

  isValid: boolean;

  isComponentValid : boolean;

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
    this.helpInfoMsg = this.helpInfoMsg + '<b>Min Length<b/>: ' + value + '<br/>';
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
    this.helpInfoMsg = this.helpInfoMsg + 'Max Length: ' + value;
  }

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
Properties 
name : enable-popover
datatype : string
version : 4.0 onwards
default : none 
description : Set enable / disable popover.
*/
  @Input('enable-popover') enablepopover: boolean;

/*
Events
name : onBlur
datatype : any
version : 4.0 onwards
default : none
description : On blur event
*/ 
  @Output() onBlur: any = new EventEmitter<any>();
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
Events
name : focus
datatype : any
version : none
default : none
description : On focus event field.
*/ 
  @Output() focus: any = new EventEmitter<any>();
  /*
Events
name : change
datatype : any
version : none
default : none
description : On field value change event
*/ 
  @Output() change: any = new EventEmitter<any>();
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
  onblur() {
    this.onTouchedCallback();
    this.showToolTip = false;
    if (this.value && (this.value.length < this.minlength)) {
      this.isValid = false;
    } else {
      this.isValid = true;
    }
    this.onBlur.emit(this.value);
  }

  onInput(input:any) {
    this.isComponentValid = input.valid;
    this.input.emit(this.value);
  }

  onFocus() {
    this.showToolTip = true;
    this.focus.emit(this.value);
  }

  onChangeEv() {
    this.change.emit(this.value);
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

  ngOnInit() {
    this.isComponentValid = this.allowblank;
  }
  
  getValidationClasses(inp: any): any {
    let classObj;
    if (inp.touched && !this.allowblank && (this.value == '' || this.value == null)) {
      classObj = {'input-control-error': true};
      //this.helpInfoMsg = this.helpInfoMsg + 'This field is manditory ! ';
      this.isValid = false;
    } else if (inp.touched && this.minlength != null) {
      if (this.value && (this.value.length < this.minlength)) {
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



