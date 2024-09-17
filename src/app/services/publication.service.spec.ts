import { TestBed } from '@angular/core/testing';
import { PublicationService } from './publication.service';
import { Storage } from '@ionic/storage-angular';
import { of } from 'rxjs';

describe('PublicationService', () => {
  let service: PublicationService;
  let storageSpy: jasmine.SpyObj<Storage>;

  beforeEach(async () => {
    // Crear un mock de Ionic Storage
    const spy = jasmine.createSpyObj('Storage', ['get', 'set', 'create']);

    await TestBed.configureTestingModule({
      providers: [
        PublicationService,
        { provide: Storage, useValue: spy }
      ]
    }).compileComponents();

    // Inyectar el servicio y el mock del Storage
    service = TestBed.inject(PublicationService);
    storageSpy = TestBed.inject(Storage) as jasmine.SpyObj<Storage>;

    // Simular que create() se resuelve
    storageSpy.create.and.returnValue(Promise.resolve() as unknown as Promise<Storage>);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a publication and save it in storage', async () => {
    const mockPublication = { title: 'Test', subtitle: 'Subtitle', description: 'Test description', photo: 'photo-url' ,date: new Date()};

    // Simular el método set() para guardar en storage
    storageSpy.set.and.returnValue(Promise.resolve());

    // Llamar al método addPublication
    await service.addPublication(mockPublication);

    // Verificar que se llamó al método set() con la clave correcta
    expect(storageSpy.set).toHaveBeenCalledWith('publications', [mockPublication]);
  });

  it('should retrieve publications from storage', async () => {
    const mockPublications = [{ title: 'Test', subtitle: 'Subtitle', description: 'Test description', photo: 'photo-url' }];

    // Simular el método get() para obtener publicaciones del storage
    storageSpy.get.and.returnValue(Promise.resolve(mockPublications));

    const publications = await service.getPublications();

    // Verificar que se hayan recuperado correctamente
    expect(publications).toEqual(mockPublications);
    expect(storageSpy.get).toHaveBeenCalledWith('publications');
  });
});
