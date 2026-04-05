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
  classPercentage: number | null = null; // ADD THIS LINE
  eligibleStreams: string[] = []; // ADD THIS LINE
  totalBestMarks: number = 0;

  /* ================= CLASS OPTIONS ================= */
  classes = [1,2,3,4,5,6,7,8,9,10,11];

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
    dob: new FormControl('', Validators.required),
    age: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(3),
      Validators.max(25)
    ]),
    studentAadhaar : new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]{12}$')
    ]),
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
    
    guardianship: new FormControl('', 
      Validators.required),

    guardianname: new FormControl('', [
      Validators.pattern('^[A-Za-z ]+$')
    ]),
    guardianprofession: new FormControl('', [
      Validators.pattern('^[A-Za-z ]+$')
    ]),
    guardianrelation: new FormControl('', [
      Validators.pattern('^[A-Za-z ]+$')
    ]),
    
    annual_income: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9.]+$')
    ]),


    /* ===== CONTACT ===== */
    address: new FormControl('', Validators.required),
    state: new FormControl('', 
      [Validators.required,Validators.pattern('^[A-Za-z ]+$')]),
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
    religion: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z ]+$')]),

    /* ===== SIBLING ===== */
    hasSibling: new FormControl('', Validators.required),
    siblingName: new FormControl(''),
    siblingRoll: new FormControl(''),
    siblingClass: new FormControl(''),


    stream: new FormControl(''),
    scienceType: new FormControl(''),

    mathMarks: new FormControl('',       [Validators.required,Validators.min(0), Validators.max(100)]),
    scienceMarks: new FormControl('',    [Validators.required,Validators.min(0), Validators.max(100)]),
    socialMarks: new FormControl('',     [Validators.required,Validators.min(0), Validators.max(100)]),
    hindiMarks: new FormControl('',      [Validators.required,Validators.min(0), Validators.max(100)]),
    englishMarks: new FormControl('',    [Validators.required,Validators.min(0), Validators.max(100)]),
    additionalMarks: new FormControl('', [Validators.required,Validators.min(0), Validators.max(100)]),
    boardName: new FormControl('',       [Validators.required, Validators.pattern('^[A-Za-z ]+$')]),
    schoolName: new FormControl('',      [Validators.required, Validators.pattern('^[A-Za-z ]+$')]),

    
  });
  

  /* ================= INIT ================= */

  ngOnInit(): void {
    
      this.student_form.get('guardianship')?.valueChanges.subscribe(value => {

      if (value === 'Other') {

        this.name?.setValidators([Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]);
        this.profession?.setValidators([Validators.required]);
        this.relation?.setValidators([Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]);

      } else {

        this.name?.clearValidators();
        this.profession?.clearValidators();
        this.relation?.clearValidators();

      }

      this.name?.updateValueAndValidity();
      this.profession?.updateValueAndValidity();
      this.relation?.updateValueAndValidity();

      this.studentClass?.valueChanges.subscribe(cls => {
      const isClass11 = Number(cls) === 11;

        const controls = [
          this.boardName,
          this.schoolName,
          this.mathMarks,
          this.scienceMarks,
          this.socialMarks,
          this.hindiMarks,
          this.englishMarks,
          this.additionalMarks,
          this.stream
        ];

        controls.forEach(control => {
          if (isClass11) {
            control?.setValidators(Validators.required);
          } else {
            control?.clearValidators();
            control?.setValue(''); // reset
          }
          control?.updateValueAndValidity();
        });
      });

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
        // ADD THIS: Calculate percentage and check stream eligibility
    this.student_form.get('mathMarks')?.valueChanges.subscribe(() => this.calculateStreamEligibility());
    this.student_form.get('scienceMarks')?.valueChanges.subscribe(() => this.calculateStreamEligibility());
    this.student_form.get('socialMarks')?.valueChanges.subscribe(() => this.calculateStreamEligibility());
    this.student_form.get('hindiMarks')?.valueChanges.subscribe(() => this.calculateStreamEligibility());
    this.student_form.get('englishMarks')?.valueChanges.subscribe(() => this.calculateStreamEligibility());
  }

  /* ================= STEP ACTIONS ================= */

  calculateAge() {

    const dobValue = this.student_form.get('dob')?.value;

    if (!dobValue) return;

    const dob = new Date(dobValue);
    const today = new Date();

    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
      age--;
    }

    this.student_form.patchValue({
      age: age
    });

  }
    /* ================= STREAM ELIGIBILITY ================= */
  calculateStreamEligibility() {
  const getMark = (name: string) => {
    const val = this.student_form.get(name)?.value;
    if (val == null || val === '') return 0;

    const num = +val;

    // Validation: clamp between 0–100
    if (num < 0) return 0;
    if (num > 100) return 100;

    return num;
  };

  const math = getMark('mathMarks');
  const science = getMark('scienceMarks');
  const social = getMark('socialMarks');
  const hindi = getMark('hindiMarks');
  const english = getMark('englishMarks');
  const additional = getMark('additionalMarks');

  // 👉 English compulsory
  const optionalSubjects = [math, science, social, hindi, additional];

  // 👉 pick best 4 from remaining 5
  optionalSubjects.sort((a, b) => b - a);
  const bestFour = optionalSubjects.slice(0, 4);

  this.totalBestMarks = english + bestFour.reduce((a, b) => a + b, 0);

this.classPercentage = (this.totalBestMarks / 500) * 100;

  // eligibility same
  this.eligibleStreams = [];

  if (this.classPercentage >= 80) this.eligibleStreams.push('Science');
  if (this.classPercentage >= 60) this.eligibleStreams.push('Commerce');
  if (this.classPercentage >= 33) this.eligibleStreams.push('Arts');
}
  /* ================= STREAM VALIDATION ================= */
  isStreamEligible(streamName: string | null | undefined): boolean {
  if (!streamName) return false;
  return this.eligibleStreams.includes(streamName);
}
getPercentage(mark: any): string {
  if (mark === null || mark === '' || isNaN(mark)) return '0';
  return ((+mark / 100) * 100).toFixed(0);
}

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

  const cls = Number(this.studentClass?.value);

  // ✅ STEP 1 VALIDATION ONLY
  if (this.step === 1) {

    const step1Fields = [
      this.firstName, this.lastName, this.dob, this.age,
      this.gender, this.fatherName, this.father_profession,
      this.motherName, this.mother_profession,
      this.guardians, this.annual_income,
      this.address, this.state, this.city,
      this.phone, this.mail, this.aadhaar,
      this.caste, this.religion, this.hasSibling
    ];

    let isValid = true;

    step1Fields.forEach(control => {
      if (control?.invalid) {
        control.markAsTouched();
        isValid = false;
      }
    });

    if (!isValid) return;
  }

  // ✅ STEP 2 VALIDATION (ONLY CLASS 11)
  if (this.step === 2 && cls === 11) {

    const step2Fields = [
      this.boardName, this.schoolName,
      this.mathMarks, this.scienceMarks,
      this.socialMarks, this.hindiMarks,
      this.englishMarks, this.additionalMarks,
      this.stream
    ];

    let isValid = true;

    step2Fields.forEach(control => {
      if (control?.invalid) {
        control.markAsTouched();
        isValid = false;
      }
    });

    if (!isValid) return;

    // stream eligibility check
    if (!this.isStreamEligible(this.stream?.value)) {
      alert('Not eligible for selected stream');
      return;
    }
  }

  // ✅ STEP FLOW
  if (this.step === 1 && cls === 11) {
    this.step = 2;
    return;
  }

  if (this.step === 1 && cls !== 11) {
    this.step = 3;
    return;
}

  this.step++;
}
  back() {
  if (this.step > 0) {
    // If we're at step 3 and student is NOT class 11, skip back to step 1
    if (this.step === 3 && this.studentClassAsNumber !== 11) {
      this.step = 1;
    } else {
      this.step--;
    }
  }
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
  get dob() { return this.student_form.get('dob'); }
  get studentAadhaar() { return this.student_form.get('studentAadhaar'); }
  get gender() { return this.student_form.get('gender'); }
  get fatherName() { return this.student_form.get('fatherName'); }
  get father_profession() { return this.student_form.get('father_profession'); }
  get motherName() { return this.student_form.get('motherName'); }
  get mother_profession() { return this.student_form.get('mother_profession'); }
  get guardians() { return this.student_form.get('guardianship'); }
  get name() { return this.student_form.get('guardianname'); }
  get profession() { return this.student_form.get('guardianprofession'); }
  get relation() { return this.student_form.get('guardianrelation'); }
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
  get boardName() { return this.student_form.get('boardName'); }
  get schoolName() { return this.student_form.get('schoolName'); }
  get mathMarks() { return this.student_form.get('mathMarks'); }
  get scienceMarks() { return this.student_form.get('scienceMarks'); }
  get englishMarks() { return this.student_form.get('englishMarks'); }
  get hindiMarks() { return this.student_form.get('hindiMarks'); }
  get socialMarks() { return this.student_form.get('socialMarks'); }
  get additionalMarks() { return this.student_form.get('additionalMarks'); }
  get stream() { return this.student_form.get('stream'); }
  get scienceType() { return this.student_form.get('scienceType'); }
  get studentClassAsNumber(): number | null {
  const value = this.studentClass?.value;
  if (!value) return null;
  const num = +value;
  return isNaN(num) ? null : num;
}
}
