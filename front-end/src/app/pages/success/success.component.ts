import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { BagService } from '../../services/bag.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './success.component.html',
  styleUrl: './success.component.scss',
})
export class SuccessComponent implements OnInit {
  loading = true;
  paymentId: string = '';
  purchase!: any;
  purchaseClothes: any[] = [];
  error: string | null = null;

  constructor(
    private bagService: BagService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private zone: NgZone,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  private async loadData() {
    try {
      this.route.queryParams
        .pipe(
          switchMap((params) => {
            this.paymentId = params['payment_id'];
            return this.authService.getPurchaseByPaymentId(this.paymentId);
          }),

          switchMap((purchase) => {
            this.purchase = purchase;
            return this.authService.getClotheByPurchaseId(this.purchase.idPu);
          })
        )
        .subscribe((purchaseClothes) => {
          this.zone.run(() => {
            this.purchaseClothes = Array.isArray(purchaseClothes)
              ? purchaseClothes
              : [purchaseClothes];

            this.bagService.clearBag();

            Swal.fire({
              icon: 'success',
              title: 'Purchase successful',
              timer: 2000,
              showConfirmButton: false,
            });
          });
        });
    } catch (error) {
      error = error;
    } finally {
      this.loading = false;
      setTimeout(() => {
        this.cd.detectChanges();
      }, 500);
    }
  }

  navigate() {
    this.router.navigate(['']);
  }
}
