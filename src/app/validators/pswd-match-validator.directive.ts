import { Directive } from '@angular/core';
import { AbstractControl, FormGroup, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

export const pswdMatchValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const newpswd1 = control.get('newpswd1');
  const newpswd2 = control.get('newpswd2');
  const oldpswd=control.get('oldpswd');
  // return newpswd1 && newpswd2 && newpswd1.value !== newpswd2.value ? { 'unmatch': true } : null;

  var obj={
    oldPswdMatch:null,
    newPswdUnmatch:null
  }

  if(oldpswd && newpswd2 && oldpswd.value === newpswd1.value){
    // control.errors.setErrors({
    //   oldPswdMatch: true
    // })
    obj.oldPswdMatch=true;
  }

  if(newpswd1 && newpswd2 && newpswd1.value !== newpswd2.value){
    // control.errors.setErrors({
    //   newPswdUnmatch: true
    // })
    obj.newPswdUnmatch=true
  }


  return !obj.newPswdUnmatch && !obj.oldPswdMatch?null:obj;
};

@Directive({
  selector: '[appPswdMatchValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: PswdMatchValidatorDirective, multi: true }]
})
export class PswdMatchValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors {
    return pswdMatchValidator(control)
  }
}