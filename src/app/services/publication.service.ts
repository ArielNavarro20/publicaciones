import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  private _storage: Storage | null = null;
  private PUBLICATION_KEY = 'publications';

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    // Inicializa el almacenamiento
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async addPublication(publication: { title: string, subtitle: string, description: string, photo: string, date?: Date }): Promise<void> {
    const publications = await this.getPublications();

    // Set the date to the current date if not provided
    if (!publication.date) {
      publication.date = new Date();
    }

    publications.push(publication);
    await this._storage?.set(this.PUBLICATION_KEY, publications);
    console.log('Publication added:', publication);
  }

  async getPublications(): Promise<any[]> {
    const publications = await this._storage?.get(this.PUBLICATION_KEY);
    console.log('Publications retrieved from storage:', publications);
    return publications || [];
  }

  async getPublicationById(index: number): Promise<any> {
    const publications = await this.getPublications();
    return publications[index];
  }

  async updatePublication(index: number, updatedPublication: { title: string, subtitle: string, description: string, photo: string, date?: Date }): Promise<void> {
    const publications = await this.getPublications();
    // Update the date if provided
    if (updatedPublication.date) {
      publications[index].date = updatedPublication.date;
    }
    publications[index] = updatedPublication;
    await this._storage?.set(this.PUBLICATION_KEY, publications);
  }

  async deletePublication(index: number): Promise<void> {
    const publications = await this.getPublications();
    publications.splice(index, 1); // Elimina el elemento en la posición del índice
    await this._storage?.set(this.PUBLICATION_KEY, publications);
  }

  async clearStorage(): Promise<void> {
    try {
      await this._storage?.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  }
}
