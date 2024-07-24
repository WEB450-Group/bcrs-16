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
  employeeInitials: string;
  errorMessage: string;
  successfulMessage: string;
  isLoading: boolean = false;
  editModeCheck: boolean = false;
  avatarColors: Array<string> = [ '#228c57', '#1e7048', '#26a06b', '#1f7042', '#2ca478', '#1b6239' ]; // Shades of green
  randomAvatarColor: string;

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
    this.employeeInitials = '';
    this.errorMessage = '';
    this.successfulMessage = '';
    this.randomAvatarColor = this.avatarColors[Math.floor(Math.random() * this.avatarColors.length)];

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
        // Set the intitials of the employee name
        this.employeeInitials = `${this.employee.firstName.charAt(0)}${this.employee.lastName.charAt(0)}`;
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
        this.editModeCheck = false;
        console.log(this.editModeCheck);
        this.successfulMessage = 'Profile updated successfully';

        // Set a timer for the successful message
        setTimeout(() => {
          this.successfulMessage = '';
        }, 1500);

        // Re-fetch the employee data
        this.employeeService.findEmployeeById(this.employeeId).subscribe({
          next: (employee: any) => {
            console.log(employee);
            // Update the employee data
            this.employee = employee;
            // Update the employee intitials in case they change their last name
            this.employeeInitials = `${this.employee.firstName.charAt(0)}${this.employee.lastName.charAt(0)}`;
            // Update the form with the new data
            this.updateProfileForm.patchValue({
              lastName: this.employee.lastName,
              phoneNumber: this.employee.phoneNumber,
              address: this.employee.address
            });
          },
          error: (err) => {
            console.error(err);
            this.errorMessage = `Cannot find the employee with ID ${this.employeeId}`;
            // Set a timer for the error message
            setTimeout(() => {
              this.errorMessage = '';
            }, 1500);
          }
        });
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
        this.errorMessage = 'Failed to update profile information';
        // Set a timer for the error message
        setTimeout(() => {
          this.errorMessage = '';
        }, 1500);
      },
    })
  }

  editMode() {
    this.editModeCheck = !this.editModeCheck;
  }
}
