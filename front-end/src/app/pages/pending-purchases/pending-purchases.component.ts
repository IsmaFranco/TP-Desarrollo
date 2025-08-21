import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pending-purchases',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pending-purchases.component.html',
  styleUrl: './pending-purchases.component.scss'
})
export class PendingPurchasesComponent implements OnInit {
  pendingPurchases: any[] = [];
  sentPurchases: any[] = [];

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.loadPurchases();
  }

  loadPurchases(): void {
    this.authService.getPurchases().subscribe({
      next: (purchases) => {
        this.pendingPurchases = purchases.filter((p: { shipment: { status: string; }; }) => p.shipment.status === 'Pending');
        this.sentPurchases = purchases.filter((p: { shipment: { status: string; }; }) => p.shipment.status === 'Sent');
      },
      error: (error) => {
        console.error('Error loading purchases:', error);
        Swal.fire('Error', 'Could not load purchases', 'error');
      }
    });
  }

  markAsSent(idSh: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to mark shipment #${idSh} as sent?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#dc3545',
      confirmButtonText: 'Yes, mark as sent',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.updateShipmentStatus(idSh, 'Sent').subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Updated!',
              text: `Order ${idSh} as sent`
            });
            this.loadPurchases();
          },
          error: (error) => {
            console.error('Error updating status:', error);
            Swal.fire('Error', 'Could not update status', 'error');
          }
        });
      }
    });
  }

  markAsDelivered(idSh: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to mark shipment #${idSh} as delivered?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#dc3545',
      confirmButtonText: 'Yes, mark as delivered',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.updateShipmentStatus(idSh, 'Delivered').subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Updated!',
              text: `Order ${idSh} as delivered`
            });
            this.loadPurchases();
          },
          error: (error) => {
            console.error('Error updating status:', error);
            Swal.fire('Error', 'Could not update status', 'error');
          }
        });
      }
    });
  }
}
