import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule
} from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './form.html',
  styleUrl: './form.css'
})
export class Form implements OnInit {

  /* ================= STEP CONTROL ================= */
  step = 0;

  /* ================= CLASS OPTIONS ================= */
  classes = [1,2,3,4,5,6,7,8,9,10,11,12];

  /* ================= FILE NAMES ================= */
  photoFileName = '';
  signatureFileName = '';
  aadhaarFileName = '';
  birthFileName = '';

  /* ================= FILE OBJECTS ================= */
  photoFile!: File;
  signatureFile!: File;
  aadhaarFile!: File;
  birthFile!: File;

  /* ================= FORM GROUP ================= */
  student_form = new FormGroup({

    /* ===== PRE FORM ===== */
    studentClass: new FormControl('', Validators.required),
    mobile: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]{10}$')
    ]),

    /* ===== STUDENT ===== */
    firstName: new FormControl('', [
      Validators.required,
      Validators.pattern('^[A-Za-z]+$')
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.pattern('^[A-Za-z]+$')
    ]),
    age: new FormControl('', [
      Validators.required,
      Validators.min(3),
      Validators.max(25)
    ]),
    studentAadhaar: new FormControl(''),
    gender: new FormControl('', Validators.required),

    /* ===== FAMILY ===== */
    fatherName: new FormControl('', [
      Validators.required,
      Validators.pattern('^[A-Za-z ]+$')
    ]),

    father_profession: new FormControl('', [
      Validators.required,
      Validators.pattern('^[A-Za-z ]+$')
    ]),

    motherName: new FormControl('', [
      Validators.required,
      Validators.pattern('^[A-Za-z ]+$')
    ]),

    mother_profession: new FormControl('', [
      Validators.required,
      Validators.pattern('^[A-Za-z ]+$')
    ]),

    annual_income: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9.]+$')
    ]),


    /* ===== CONTACT ===== */
    address: new FormControl('', Validators.required),
    state: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z ]+$')]),
    city: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z ]+$')]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]{10}$')
    ]),
    mail: new FormControl('', [
      Validators.required,
      Validators.email
    ]),

    /* ===== IDENTITY ===== */
    aadhaar: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]{12}$')
    ]),
    caste: new FormControl('', Validators.required),
    religion: new FormControl('', Validators.required),

    /* ===== SIBLING ===== */
    hasSibling: new FormControl('', Validators.required),
    siblingName: new FormControl(''),
    siblingRoll: new FormControl(''),
    siblingClass: new FormControl('')
  });

  /* ================= INIT ================= */
  ngOnInit(): void {

    // Dynamic Student Aadhaar validation (age > 10)
    this.age?.valueChanges.subscribe(value => {

      const ageValue = Number(value);

      if (!ageValue || ageValue <= 10) {
        this.studentAadhaar?.clearValidators();
        this.student_form.patchValue({
          studentAadhaar: ''
        });
      } else {
        this.studentAadhaar?.setValidators([
          Validators.required,
          Validators.pattern('^[0-9]{12}$')
        ]);
      }

      this.studentAadhaar?.updateValueAndValidity();
    });

    // Dynamic sibling validation
    this.hasSibling?.valueChanges.subscribe(value => {
      if (value === 'yes') {
        this.siblingName?.setValidators(Validators.required);
        this.siblingRoll?.setValidators(Validators.required);
        this.siblingClass?.setValidators(Validators.required);
      } else {
        this.siblingName?.clearValidators();
        this.siblingRoll?.clearValidators();
        this.siblingClass?.clearValidators();

        this.student_form.patchValue({
          siblingName: '',
          siblingRoll: '',
          siblingClass: ''
        });
      }

      this.siblingName?.updateValueAndValidity();
      this.siblingRoll?.updateValueAndValidity();
      this.siblingClass?.updateValueAndValidity();
    });

    this.studentClass?.valueChanges.subscribe(cls => {
      if (cls != null && +cls === 1) {
        this.age?.setValidators([
          Validators.required,
          Validators.min(5),
          Validators.max(8)
        ]);
      } else {
        this.age?.setValidators([
          Validators.required,
          Validators.min(3),
          Validators.max(25)
        ]);
      }

      this.age?.updateValueAndValidity();
    });

  }

  /* ================= STEP ACTIONS ================= */

  verify() {
    if (this.studentClass?.invalid) {
      //alert('Please select class');
      this.studentClass?.markAsTouched();
      return;
    }

    if (this.mobile?.invalid) {
      //alert('Please enter valid 10-digit mobile number');
      this.mobile?.markAsTouched();
      return;
    }

    this.step = 1;
  }


  next() {
    if (this.student_form.invalid) {
      this.student_form.markAllAsTouched();
      return;
    }
    this.step++;
  }

  back() {
    if (this.step > 0) this.step--;
  }

  /* ================= SUBMIT ================= */
  sub_form() {
    if (this.student_form.invalid) {
      this.student_form.markAllAsTouched();
      alert('Please complete all required fields');
      return;
    }

    if (!this.photoFile || !this.signatureFile || !this.aadhaarFile || !this.birthFile) {
      alert('Please upload all documents');
      return;
    }

    console.log('Form Value:', this.student_form.value);
    console.log('Files:', {
      photo: this.photoFile,
      signature: this.signatureFile,
      aadhaar: this.aadhaarFile,
      birth: this.birthFile
    });

    alert('Form submitted successfully!');
  }

  /* ================= FILE HANDLERS ================= */

  onImageSelect(event: any, type: string) {
    const file = event.target.files[0];
    if (!file) return;

    if (type === 'photo') {
      this.photoFile = file;
      this.photoFileName = file.name;
    }

    if (type === 'signature') {
      this.signatureFile = file;
      this.signatureFileName = file.name;
    }
  }

  onFileSelect(event: any, type: string) {
    const file = event.target.files[0];
    if (!file) return;

    if (type === 'aadhaar') {
      this.aadhaarFile = file;
      this.aadhaarFileName = file.name;
    }

    if (type === 'birth') {
      this.birthFile = file;
      this.birthFileName = file.name;
    }
  }

  /* ================= GETTERS ================= */
  get studentClass() { return this.student_form.get('studentClass'); }
  get mobile() { return this.student_form.get('mobile'); }
  get firstName() { return this.student_form.get('firstName'); }
  get lastName() { return this.student_form.get('lastName'); }
  get age() { return this.student_form.get('age'); }
  get studentAadhaar() { return this.student_form.get('studentAadhaar'); }
  get gender() { return this.student_form.get('gender'); }
  get fatherName() { return this.student_form.get('fatherName'); }
  get father_profession() { return this.student_form.get('father_profession'); }
  get motherName() { return this.student_form.get('motherName'); }
  get mother_profession() { return this.student_form.get('mother_profession'); }
  get annual_income() { return this.student_form.get('annual_income'); }
  get address() { return this.student_form.get('address'); }
  get state() { return this.student_form.get('state'); }
  get city() { return this.student_form.get('city'); }
  get phone() { return this.student_form.get('phone'); }
  get mail() { return this.student_form.get('mail'); }
  get aadhaar() { return this.student_form.get('aadhaar'); }
  get caste() { return this.student_form.get('caste'); }
  get religion() { return this.student_form.get('religion'); }
  get hasSibling() { return this.student_form.get('hasSibling'); }
  get siblingName() { return this.student_form.get('siblingName'); }
  get siblingRoll() { return this.student_form.get('siblingRoll'); }
  get siblingClass() { return this.student_form.get('siblingClass'); }
}
