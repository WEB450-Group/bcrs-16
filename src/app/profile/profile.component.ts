/*
============================================
; Title:  profile.component.ts
; Author: Professor Krasso
; Date: 29. June, 2024
; Modified by: Joanna Brumfield and Zadkiel Rodriguez Alvarado
; Description: User Profile Component
;===========================================
*/
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee, UpdateProfile } from '../shared/employee.interface';
import { EmployeeService } from '../shared/employee.service';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  // Local variables
  employeeId: number;
  employee: Employee;
  errorMessage: string;
  successfulMessage: string;
  isLoading: boolean = false;
  editModeCheck: boolean = false;

  updateProfileForm: FormGroup = this.fb.group({
    lastName: [null, Validators.compose([Validators.required])],
    phoneNumber: [null, Validators.compose([Validators.required, Validators.pattern('^[0-9]{10}$')])],
    address: [null, Validators.compose([Validators.required])]
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private authService: AuthService
  ) {
    const l_employeeID = this.route.snapshot.paramMap.get('employeeId') || '';
    this.employeeId = parseInt(l_employeeID, 10);
    this.employee = {} as Employee;
    this.errorMessage = '';
    this.successfulMessage = '';

    // If the employeeId is not a number; then navigate the user back to the home page
    if(isNaN(this.employeeId)) {
      this.router.navigate(['/']);
    } else {
      this.authService.setEmployeeId(l_employeeID);
    }

    // Get the employee information by calling the findEmployeeById function
    this.employeeService.findEmployeeById(this.employeeId).subscribe({
      next: (employee: any) => {
        console.log(employee);
        // Set the employee found by the ID
        this.employee = employee;
        // Set the default values of the form
        this.updateProfileForm.patchValue({
          lastName: this.employee.lastName,
          phoneNumber: this.employee.phoneNumber,
          address: this.employee.address
        });
      },
      error: (err) => {
        console.error(err);
        // Write the error message
        this.errorMessage = `Cannot find the employee with ID ${this.employeeId}`;
      }
    })
  }

  updateProfile() {
    this.isLoading = true;

    // Create an update employee object
    let updateProfileEmployee = {} as UpdateProfile;

    // Set the update profile employee values to the ones on the form
    updateProfileEmployee.lastName = this.updateProfileForm.controls['lastName'].value;
    updateProfileEmployee.phoneNumber = parseInt(this.updateProfileForm.controls['phoneNumber'].value);
    updateProfileEmployee.address = this.updateProfileForm.controls['address'].value;

    console.log(updateProfileEmployee);

    // Call the updateProfile API and pass in the employeeId and new information from the employee
    this.employeeService.updateProfile(this.employeeId, updateProfileEmployee).subscribe({
      next: (result: any) => {
        console.log(result);
        this.isLoading = false;
        this.successfulMessage = 'Profile updated successfully';
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
        this.errorMessage = 'Failed to update profile information';
      }
    })
  }

  editMode() {
    this.editModeCheck = !this.editModeCheck;
  }
}
