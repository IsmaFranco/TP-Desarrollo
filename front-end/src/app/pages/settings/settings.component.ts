import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';
import { User } from '../../models/clothes.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit, OnDestroy {
  user: User | null = null;
  localities: any[] = [];

  passwordForm: FormGroup;
  profileForm: FormGroup;
  deleteForm: FormGroup;

  showChangePassword = false;
  showUpdateProfile = false;
  showDeleteAccount = false;

  private subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router
  ) {
    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });

    this.profileForm = this.fb.group({
      nameUs: ['', Validators.required],
      lastNameUs: ['', Validators.required],
      phoneUs: ['', Validators.required],
      addressUs: ['', Validators.required],
      idLo: ['', Validators.required]
    });

    this.deleteForm = this.fb.group({
      password: ['', Validators.required],
      confirmText: ['', Validators.required]
    }, { validators: this.deleteConfirmValidator });
  }

  ngOnInit(): void {
    this.loadUserData();
    this.loadLocalities();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private loadUserData(): void {
    const userSub = this.tokenService.currentUser$.subscribe(userData => {
      if (userData?.user) {
        this.user = userData.user;
        this.populateProfileForm();
      }
    });
    this.subscriptions.push(userSub);
    this.tokenService.checkAuthStatus();
  }

  private populateProfileForm(): void {
    if (this.user) {
      this.profileForm.patchValue({
        nameUs: this.user.nameUs,
        lastNameUs: this.user.lastNameUs,
        phoneUs: this.user.phoneUs,
        addressUs: this.user.addressUs,
        idLo: this.user.locality?.idLo || ''
      });
    }
  }

  private loadLocalities(): void {
    const localitiesSub = this.authService.getLocalities().subscribe({
      next: (localities) => {
        this.localities = localities;
      },
      error: (error) => {
        console.error('Error loading localities:', error);
      }
    });
    this.subscriptions.push(localitiesSub);
  }

  private passwordMatchValidator(control: AbstractControl): { [key: string]: any } | null {
    const newPassword = control.get('newPassword');
    const confirmPassword = control.get('confirmPassword');

    if (newPassword && confirmPassword && newPassword.value !== confirmPassword.value) {
      return { 'passwordMismatch': true };
    }
    return null;
  }

  private deleteConfirmValidator(control: AbstractControl): { [key: string]: any } | null {
    const confirmText = control.get('confirmText');

    if (confirmText && confirmText.value !== 'DELETE') {
      return { 'confirmTextMismatch': true };
    }
    return null;
  }

  changePassword(): void {
    if (this.passwordForm.valid && this.user) {
      const passwordData = {
        idUs: this.user.idUs,
        currentPassword: this.passwordForm.value.currentPassword,
        newPassword: this.passwordForm.value.newPassword
      };

      const changePasswordSub = this.authService.changePassword(passwordData).subscribe({
        next: (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Password changed successfully!',
            confirmButtonText: 'OK'
          });
          this.passwordForm.reset();
          this.showChangePassword = false;
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error changing password',
            confirmButtonText: 'OK'
          });
        }
      });
      this.subscriptions.push(changePasswordSub);
    }
  }

  updateProfile(): void {
    if (this.profileForm.valid && this.user) {
      const profileData = {
        ...this.profileForm.value,
        idUs: this.user.idUs
      };

      const updateProfileSub = this.authService.updateProfile(profileData).subscribe({
        next: (response: any) => {
          Swal.fire({
            icon: 'success',
            title: 'Profile updated successfully!',
            confirmButtonText: 'OK'
          });
          this.showUpdateProfile = false;
          if (response.token) {
            this.tokenService.updateToken(response.token);
            this.user = response.user;
            this.populateProfileForm();
          }
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error updating profile',
            text: error.error?.message || 'Unknown error',
            confirmButtonText: 'OK'
          });
        }
      });
      this.subscriptions.push(updateProfileSub);
    }
  }

  deleteAccount(): void {
    if (this.deleteForm.valid && this.user) {
      Swal.fire({
        title: '¿Are you sure?',
        text: 'This action cannot be undone.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Delete account',
        cancelButtonText: 'Cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          const deleteData = {
            idUs: this.user!.idUs,
            password: this.deleteForm.value.password
          };

          const deleteAccountSub = this.authService.deleteAccount(deleteData).subscribe({
            next: (response) => {
              Swal.fire({
                icon: 'success',
                title: 'Account deleted successfully!',
                confirmButtonText: 'OK'
              });
              this.tokenService.logout();
              this.router.navigate(['/login']);
            },
            error: (error) => {
              Swal.fire({
                icon: 'error',
                title: 'Error deleting account',
                text: error.error?.message || 'Unknown error',
                confirmButtonText: 'OK'
              });
            }
          });
          this.subscriptions.push(deleteAccountSub);
        }
      });
    }
  }
}