import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form',
  imports: [FormsModule , CommonModule],
  templateUrl: './form.html',
  styleUrl: './form.css',
})
export class Form {

  mobile: string = '';
  otp: string = '';

  classes = [1,2,3,4,5,6,7,8,9,10,11,12];
  selectedClass: number | null = null;

  next:number = 0;

  sendOtp() {

    // class validation
    if (!this.selectedClass) {
      alert('Please select a class');
      return;
    }

    // mobile validation
    if (!this.mobile) {
      alert('Please enter mobile number');
      return;
    }

    if (!/^\d{10}$/.test(this.mobile)) {
      alert('Enter a valid 10-digit mobile number');
      return;
    }
    alert(`OTP sent to ${this.mobile}`);

  }

  verify(){
    if (!this.otp) {
      alert('Please enter OTP');
      return;
    }
    alert(`OTP ${this.otp} verified successfully!`);
    this.next++;
  }

  back(){
    this.next--;
  }

}
