import { Component, OnInit, AfterViewInit, AfterContentInit, QueryList, ViewChildren, ContentChildren } from "@angular/core";

import { AmexioTextInputComponent } from "./../textinput/textinput.component";
import { AmexioTextAreaComponent } from "./../textarea/textarea.component";
import { AmexioEmailInputComponent } from "./../emailinput/emailinput.component";
import { AmexioNumberInputComponent } from "./../numberinput/numberinput.component";
import { AmexioPasswordComponent } from "./../passwordinput/passwordinput.component";
import { AmexioCheckBoxComponent } from "./../checkbox/checkbox.component";
import { AmexioRadioGroupComponent } from "./../radio/radiogroup.component";
import { AmexioDropDownComponent } from "./../dropdown/dropdown.component";
import { AmexioTypeAheadComponent} from "./../typeahead/typeahead.component"
import { AmexioTagsInputComponent} from "./../tagsinput/tags.input.component"
@Component({
    selector: 'amexio-form-component',
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
    
    constructor(){
        this.isFormValid = false;
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
