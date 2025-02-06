
// import { Component } from '@angular/core';
// import { FormsModule, NgForm ,FormGroup,FormBuilder } from '@angular/forms';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// // Enum for Input Modes
// export enum InputMode {
//   Code ,
//   InvestorId
// }

// @Component({
//   selector: 'app-radio-demo',
//   standalone: true,
//   imports: [FormsModule, NgbModule],
//   templateUrl: './radio-demo.component.html',
//   styleUrls: ['./radio-demo.component.css']
// })
// export class RadioDemoComponent {
//   public InputMode = InputMode;
//   selectedMode: InputMode = InputMode.Code; // Default selection
//   formData = { codeEntry: '', investorId: '' }; // Form data object

//   toggleMode(mode: InputMode) {
//     this.selectedMode = mode; // Update selected mode dynamically
//   }

//   onSubmit(form: NgForm) {
//     console.log('Form submitted:', form.value);
//     alert(`Submitted Data: ${JSON.stringify(form.value, null, 2)}`);
//   }
// }

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

export enum InputMode {
  Code,
  InvestorId
}

@Component({
  selector: 'app-radio-demo',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './radio-demo.component.html',
  styleUrls: ['./radio-demo.component.css']
})
export class RadioDemoComponent implements OnInit {
  public InputMode = InputMode;
  formGroup!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      mode: [InputMode.Code], // Default: Code Entry (0)
      codeEntry: [{ value: '', disabled: false }],
      investorId: [{ value: '', disabled: true }]
    });

    // Listen for mode changes
    this.formGroup.get('mode')?.valueChanges.subscribe(mode => {
      this.updateInputStates(mode);
    });
  }

  private updateInputStates(mode: InputMode) {
    if (mode === InputMode.Code) {
      this.formGroup.get('codeEntry')?.enable();
      this.formGroup.get('investorId')?.disable();
      this.formGroup.get('investorId')?.setValue(''); // Clear disabled field
    } else {
      this.formGroup.get('investorId')?.enable();
      this.formGroup.get('codeEntry')?.disable();
      this.formGroup.get('codeEntry')?.setValue(''); // Clear disabled field
    }
  }

  onSubmit() {
    if (this.formGroup.valid) {
      const formValue = {
        mode: this.formGroup.get('mode')?.value,
        [this.formGroup.get('mode')?.value === InputMode.Code ? 'codeEntry' : 'investorId']:
          this.formGroup.get(this.formGroup.get('mode')?.value === InputMode.Code ? 'codeEntry' : 'investorId')?.value
      };
      console.log('Form submitted:', formValue);
      alert(`Submitted Data: ${JSON.stringify(formValue, null, 2)}`);
    }
  }
}
