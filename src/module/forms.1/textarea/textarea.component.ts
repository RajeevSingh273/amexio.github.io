import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

const noop = () => {
};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AmexioTextAreaComponent), multi: true
};

@Component({
  selector: 'amexio-textarea-input',
  templateUrl: './textarea.component.html',
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
  styleUrls: ['./textarea.component.scss']
})
export class AmexioTextAreaComponent implements ControlValueAccessor {

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
name : rows
datatype : number
version : 4.0 onwards
default : none 
description : rows to have in textarea
*/
  @Input() rows: number;
   /*
Properties 
name : rows
datatype : number
version : 4.0 onwards
default : none 
description : rows to have in textarea
*/
  @Input() columns: number;
  /*
Properties 
name : allow-blank
datatype : string
version : 4.0 onwards
default : none 
description : Sets if field is required
*/
  @Input('allow-blank') allowblank: boolean;

  helpInfoMsg: string;

  regEx: RegExp;

  isComponentValid : boolean;

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

  isValid: boolean;

  get pattern(): string {
    return this._pattern;
  }

  @Input('pattern')
  set pattern(value: string) {
    if (value != null) {
      this._pattern = value;
      this.regEx = new RegExp(this._pattern);
    }
  }

  @Input('enable-popover') enablepopover: boolean;

  constructor() {
    this.showToolTip = false;
  }
  ngOnInit() {
    this.isComponentValid = this.allowblank;
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
    } else {
      classObj = {
        'input-control-error': inp.invalid && (inp.dirty || inp.touched),
        'input-control-success': inp.valid && (inp.dirty || inp.touched)
      };
      if (inp.valid && (inp.dirty || inp.touched)) this.isValid = true;
    }
    return classObj;
  }

  onInput(input:any) {
    this.isComponentValid = input.valid;
    //this.input.emit(this.value);
  }
        
}



