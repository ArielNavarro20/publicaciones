import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-delete-confirmation-modal',
  templateUrl: './delete-confirmation-modal.component.html',
  styleUrls: ['./delete-confirmation-modal.component.scss'],
})
export class DeleteConfirmationModalComponent {
  constructor(private modalCtrl: ModalController) {}

  dismiss() {
    this.modalCtrl.dismiss({
      confirmed: false,
    });
  }

  confirmDelete() {
    this.modalCtrl.dismiss({
      confirmed: true,
    });
  }
}
