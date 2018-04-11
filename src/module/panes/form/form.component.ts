import { Component, OnInit, Input, AfterViewInit, AfterContentInit, QueryList, ViewChildren, ContentChildren } from "@angular/core";

import { AmexioTextInputComponent } from "./../../forms/textinput/textinput.component";
import { AmexioTextAreaComponent } from "./../../forms/textarea/textarea.component";
import { AmexioEmailInputComponent } from "./../../forms/emailinput/emailinput.component";
import { AmexioNumberInputComponent } from "./../../forms/numberinput/numberinput.component";
import { AmexioPasswordComponent } from "./../../forms/passwordinput/passwordinput.component";
import { AmexioCheckBoxComponent } from "./../../forms/checkbox/checkbox.component";
import { AmexioRadioGroupComponent } from "./../../forms/radio/radiogroup.component";
import { AmexioDropDownComponent } from "./../../forms/dropdown/dropdown.component";
import { AmexioTypeAheadComponent} from "./../../forms/typeahead/typeahead.component"
import { AmexioTagsInputComponent} from "./../../forms/tagsinput/tags.input.component"
import { AmexioDateTimePicker} from "./../../forms/datetimepicker/datetimepicker.component"

@Component({
    selector: 'amexio-form',
    templateUrl: './form.component.html'
  })
export class AmexioFormComponent implements OnInit, AfterViewInit, AfterContentInit {

    isFormValid : boolean ;

    @ContentChildren(AmexioTextInputComponent) queryTextinput : QueryList<AmexioTextInputComponent>;
    textinput: AmexioTextInputComponent[];
    
    @ContentChildren(AmexioTextAreaComponent) queryTextArea : QueryList<AmexioTextAreaComponent>;
    textarea: AmexioTextAreaComponent[];

    @ContentChildren(AmexioEmailInputComponent) queryEmailinput : QueryList<AmexioEmailInputComponent>;
    emailinput: AmexioEmailInputComponent[];

    @ContentChildren(AmexioNumberInputComponent) queryNuminput : QueryList<AmexioNumberInputComponent>;
    numinput: AmexioNumberInputComponent[];

    @ContentChildren(AmexioPasswordComponent) queryPassword : QueryList<AmexioPasswordComponent>;
    password: AmexioPasswordComponent[];

    @ContentChildren(AmexioCheckBoxComponent) queryCheckbox : QueryList<AmexioCheckBoxComponent>;
    chkBox: AmexioCheckBoxComponent[];
    
    @ContentChildren(AmexioRadioGroupComponent) queryRadio : QueryList<AmexioRadioGroupComponent>;
    radio: AmexioRadioGroupComponent[];
    
    @ContentChildren(AmexioDropDownComponent) queryDropdown : QueryList<AmexioDropDownComponent>;
    dropdown: AmexioDropDownComponent[];
    
    @ContentChildren(AmexioTypeAheadComponent) queryTypeahead : QueryList<AmexioTypeAheadComponent>;
    typeahead: AmexioTypeAheadComponent[];
    
    @ContentChildren(AmexioTagsInputComponent) queryTags : QueryList<AmexioTagsInputComponent>;
    tags: AmexioTagsInputComponent[];

    @ContentChildren(AmexioDateTimePicker) queryDate : QueryList<AmexioDateTimePicker>;
    datefiled: AmexioDateTimePicker[];  
    
      /*
Properties 
name : header-align
datatype : string
version : 4.0 onwards
default : none
description : Align of item elements inside card header example : right,center,left.
*/
     @Input('header-align') headeralign: string;

  /*
Properties 
name : footer-align
datatype :  string
version : 4.0 onwards
default : none
description : Align of item elements inside card footer example : right,center,left..
*/
    @Input('footer-align') footeralign: string;

    @Input('form-name') fname : string;

    @Input('form-header') fheader : string;

    @Input('submit-button') btnlabel : string;

    
    constructor(){
        this.isFormValid = false;
        this.headeralign = "left";
        this.footeralign = "right";
    }

    ngOnInit(){

    }

    isValid()
    {
        return this.isFormValid;
    }

    ngAfterViewInit(){
        this.textinput = this.queryTextinput.toArray();
        this.textarea = this.queryTextArea.toArray();
        this.password = this.queryPassword.toArray();
        this.emailinput = this.queryEmailinput.toArray();
        this.numinput = this.queryNuminput.toArray();
        this.chkBox = this.queryCheckbox.toArray();
        this.radio = this.queryRadio.toArray();
        this.dropdown = this.queryDropdown.toArray();
        this.typeahead = this.queryTypeahead.toArray();
        this.tags = this.queryTags.toArray();
        this.datefiled = this.queryDate.toArray();
    }

    ngAfterContentInit(){
       
    }

    ngDoCheck(){
        this.checkFormvalidity();
    }
    json : any [];

    checkFormvalidity(){
        this.isFormValid = true;
        this.json = [];
        
        if(this.textinput && this.textinput.length>0){
            this.textinput.forEach((c)=>{
                 let flag = c.isComponentValid && c.isValid;
                 if(!flag && this.isFormValid)
                 {
                    this.isFormValid = flag;
                 }
            });
        }
        if(this.dropdown && this.dropdown.length>0){
            this.dropdown.forEach((c)=>{
                 let flag = c.isComponentValid;
                 if(!flag && this.isFormValid)
                 {
                    this.isFormValid = flag;
                 }
            });
        }

        // if(this.typeahead && this.typeahead.length>0){
        //     this.typeahead.forEach((c)=>{
        //          let flag = c.isComponentValid;
        //          if(!flag && this.isFormValid)
        //          {
        //             this.isFormValid = flag;
        //          }
        //     });
        // }
        
        if(this.datefiled){
            this.datefiled.forEach((c)=>{
                debugger;
                let flag;
                if(c.selectedDate!=null) {
                    flag = true;
                }                
                if(!flag && this.isFormValid)
                {
                    this.isFormValid = flag;
                }
            });
        }
        if(this.tags && this.tags.length>0){
            this.tags.forEach((c)=>{
                 let flag = c.isComponentValid;
                 if(!flag && this.isFormValid)
                 {
                    this.isFormValid = flag;
                 }
            });
        }
        if(this.numinput && this.numinput.length>0){
            this.numinput.forEach((c)=>{
                let flag = c.isComponentValid && c.isValid;
                 if(!flag && this.isFormValid)
                 {
                    this.isFormValid = flag;
                 }
            });
        }
       if(this.password && this.password.length>0){
            this.password.forEach((c)=>{
                let flag = c.isComponentValid && c.isValid;
                 if(!flag && this.isFormValid)
                 {
                    this.isFormValid = flag;
                 }
            });
        }        
        if(this.emailinput && this.emailinput.length>0){
            this.emailinput.forEach((c)=>{
                let flag = c.isComponentValid && c.isValid;
                 if(!flag && this.isFormValid)
                 {
                    this.isFormValid = flag;
                 }
            });
        }
        if(this.radio){
            this.radio.forEach((c)=>{
                let flag = c.isComponentValid;
                 if(!flag && this.isFormValid)
                 {
                    this.isFormValid = flag;
                 }
            });
        }
        if(this.chkBox){
            this.chkBox.forEach((c)=>{
                let flag = c.isComponentValid;
                 if(!flag && this.isFormValid)
                 {
                    this.isFormValid = flag;
                 }
            });
        }
        if(this.textarea && this.textarea.length>0){
            this.textarea.forEach((c)=>{
                let flag = c.isComponentValid && c.isValid;
                 if(!flag && this.isFormValid)
                 {
                    this.isFormValid = flag;
                 }
            });
        }
      }
     
}
