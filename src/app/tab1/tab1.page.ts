import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PublicationService } from '../services/publication.service';
import { ModalController, ViewWillEnter } from '@ionic/angular';
import { DeleteConfirmationModalComponent } from '../delete-confirmation-modal/delete-confirmation-modal.component'; // Adjust path if necessary
import { DatePipe } from '@angular/common'; // Import DatePipe
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  providers: [DatePipe] // Add DatePipe to providers
})
export class Tab1Page implements OnInit, ViewWillEnter {
  publications: any[] = [];

  constructor(
    private publicationService: PublicationService,
    private changeDetector: ChangeDetectorRef,
    private modalController: ModalController,
    private datePipe: DatePipe, // Inject DatePipe
    private router: Router
  ) {}

  // Navegar a  Tab 2
  async goToTab2() {
    this.router.navigate(['/tabs/tab2']);
  }

  // Inicializar data en componente
  async ngOnInit() {
    await this.refreshData();
  }

  // refresh data
  async ionViewWillEnter() {
    await this.refreshData();
  }

  // Fetch y filtrar public
  async refreshData() {
    try {
      const allPublications = await this.publicationService.getPublications();
      console.log('All publications retrieved:', allPublications);
      this.publications = allPublications.filter(pub => pub.title && pub.description);
      console.log('Filtered publications:', this.publications);
      this.changeDetector.detectChanges();
    } catch (error) {
      console.error('Error fetching publications:', error);
    }
  }

  // delete publicacion
  async deletePublication(index: number): Promise<void> {
    const modal = await this.modalController.create({
      component: DeleteConfirmationModalComponent
    });

    await modal.present();
    const { data } = await modal.onDidDismiss();

    if (data?.confirmed) {
      try {
        
        const publicationId = this.publications[index]?.id; 
        if (publicationId) {
          await this.publicationService.deletePublication(publicationId);
          this.publications.splice(index, 1);
          this.changeDetector.detectChanges();
          console.log('Publication deleted');
        } else {
          console.error('Publication ID not found');
        }
      } catch (error) {
        console.error('Error deleting publication:', error);
      }
    }
  }

  // limpiar publicaciones
  async clearStorage() {
    try {
      await this.publicationService.clearStorage();
      console.log('Storage cleared');
      await this.refreshData();
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  }

  // Format date usando DatePipe
  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'shortDate') || '';
  }
}
