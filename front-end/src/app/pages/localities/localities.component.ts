import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-localities',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './localities.component.html',
  styleUrl: './localities.component.scss'
})
export class LocalitiesComponent implements OnInit, OnDestroy {
  localities: any[] = [];
  editingLocality: any | null = null;
  editForm: FormGroup;
  isAddingNew: boolean = false;
  private subscriptions: Subscription[] = [];

  constructor(
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.editForm = this.fb.group({
      nameLo: ['', [Validators.required, Validators.maxLength(70)]],
      postalCode: ['', [Validators.required, Validators.maxLength(8)]],
      cost: ['', [Validators.required, Validators.maxLength(5)]]
    });
  }

  ngOnInit(): void {
    this.loadLocalities();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  loadLocalities(): void {
    const localitiesSub = this.authService.getLocalities().subscribe({
      next: (localities) => {
        this.localities = localities;
      },
      error: (error) => {
        console.error('Error loading localities:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error loading localities'
        });
      }
    });
    this.subscriptions.push(localitiesSub);
  }

  editLocality(locality: any): void {
    this.editingLocality = { ...locality };
    this.editForm.patchValue({
      nameLo: locality.nameLo,
      postalCode: locality.postalCode,
      cost: locality.cost
    });
  }

  cancelEdit(): void {
    this.editingLocality = null;
    this.editForm.reset();
  }

  updateLocality(): void {
    if (this.editForm.valid && this.editingLocality) {
      const updateData = {
        nameLo: this.editForm.value.nameLo,
        cost: this.editForm.value.cost,
      };

      const updateSub = this.authService.updateLocality(this.editingLocality.idLo, updateData).subscribe({
        next: (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Updated!',
            text: 'Locality updated successfully',
            timer: 2000,
            showConfirmButton: false
          });
          this.cancelEdit();
          this.loadLocalities();
        },
        error: (error) => {
          console.error('Error updating locality:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error updating locality'
          });
        }
      });
      this.subscriptions.push(updateSub);
    }
  }

  deleteLocality(locality: any): void {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete ${locality.nameLo}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: 'var(--pay-color)',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        const deleteSub = this.authService.deleteLocality(locality.idLo).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Deleted!',
              text: 'Locality has been deleted.',
              timer: 2000,
              showConfirmButton: false
            });
            this.loadLocalities();
          },
          error: (error) => {
            console.error('Error deleting locality:', error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'This locality has associated users'
            });
          }
        });
        this.subscriptions.push(deleteSub);
      }
    });
  }

  addNewLocality(): void {
    this.isAddingNew = true;
    this.editingLocality = null;
    this.editForm.reset();
  }

  cancelAdd(): void {
    this.isAddingNew = false;
    this.editForm.reset();
  }

  createLocality(): void {
    if (this.editForm.valid) {
      this.authService.newLocality(
        this.editForm.value.nameLo,
        this.editForm.value.postalCode,
        this.editForm.value.cost
      ).subscribe({
        next: (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Created!',
            text: 'Locality created successfully',
            timer: 2000,
            showConfirmButton: false
          });
          this.isAddingNew = false;
          this.editForm.reset();
          this.loadLocalities();
        },
        error: (error) => {
          console.error('Error creating locality:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error creating locality'
          });
        }
      });
    }
  }

  hasError(field: string, typeError: string): boolean {
    return this.editForm.get(field)?.hasError(typeError) && this.editForm.get(field)?.touched || false;
  }
}