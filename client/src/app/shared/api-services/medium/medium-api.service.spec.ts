import { Injectable } from '@angular/core';
import { MediumApiService } from '@shared/api-services/medium/medium-api.service';
import { ImportMedia, MediaType, Medium } from '@app/interface';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpRequest, provideHttpClient } from '@angular/common/http';

describe('MediumApiService', () => {
  @Injectable()
  class TestImpl extends MediumApiService<Medium> {
    protected readonly resourceName: Readonly<MediaType> = 'game';
  }

  let service: MediumApiService<Medium>;
  let httpTestingController: HttpTestingController;
  let medium: Medium;
  let importMedia: ImportMedia;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), TestImpl],
    });

    service = TestBed.inject(TestImpl);
    httpTestingController = TestBed.inject(HttpTestingController);

    medium = {
      id: 'id',
      rating: 'todo',
      title: 'title',
      year: 2024,
      url: '',
      urlWebp: '',
    };
    importMedia = {
      url: 'url',
      year: 2024,
      title: 'title',
      importId: '1',
    };
  });

  function url(path: string = ''): (req: HttpRequest<any>)=> boolean {
    let url = `api/game`;
    if (path?.length) {
      url += `/${path}`;
    }

    return (req: HttpRequest<any>) => req.url.startsWith(url);
  }

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create', () => {
    expect(service).toBeDefined();
  });

  describe('search()', () => {
    it('should call correct url', () => {
      service.search('title').subscribe();
      const req = httpTestingController.expectOne(url());
      expect(req.request.params.get('search')).toEqual('title');
      req.flush([importMedia]);
    });

    it('should return result', () => {
      expect.assertions(1);
      service.search('title').subscribe(
        (result) => {
          expect(result).toEqual([importMedia]);
        },
      );
      httpTestingController.expectOne(url()).flush([importMedia]);
    });
  });

  describe('importOne()', () => {
    it('should call correct url', () => {
      service.importOne('id').subscribe();
      const req = httpTestingController.expectOne(url('id/import'));
      req.flush(importMedia);
    });

    it('should return result', () => {
      expect.assertions(1);
      service.importOne('id').subscribe(
        (result) => {
          expect(result).toEqual(importMedia);
        },
      );
      httpTestingController.expectOne(url('id/import')).flush(importMedia);
    });
  });

  describe('pullOne()', () => {
    it('should call correct url', () => {
      service.pullOne('id').subscribe();
      const req = httpTestingController.expectOne(url('id'));
      req.flush(medium);
    });

    it('should return result', () => {
      expect.assertions(3);

      service.pullOne('id').subscribe(
        (result) => {
          expect(result).toMatchObject(medium);
          expect(result.url).toEqual('image/id.jpg');
          expect(result.urlWebp).toEqual('image/id.webp');
        },
      );
      httpTestingController.expectOne(url('id')).flush(medium);
    });
  });

  describe('pullAll()', () => {
    it('should call correct url', () => {
      service.pullAll().subscribe();
      const req = httpTestingController.expectOne(url());
      req.flush([medium]);
    });

    it('should return result', () => {
      expect.assertions(3);

      service.pullAll().subscribe(
        (result) => {
          expect(result[0]).toMatchObject(medium);
          expect(result[0].url).toEqual('image/id.jpg');
          expect(result[0].urlWebp).toEqual('image/id.webp');
        },
      );
      httpTestingController.expectOne(url()).flush([medium]);
    });
  });

  describe('updateOne()', () => {
    it('should call correct url', () => {
      service.updateOne({ id: 'id', title: 'title' }).subscribe();
      const req = httpTestingController.expectOne(url('id'));
      expect(req.request.method).toEqual('PUT');
      req.flush(null);
    });

    it('should send correct body', () => {
      service.updateOne({ id: 'id', title: 'title' }).subscribe();
      const req = httpTestingController.expectOne(url('id'));
      expect(req.request.body).toEqual({ id: 'id', title: 'title' });
      req.flush(null);
    });
  });

  describe('add()', () => {
    it('should call correct url', () => {
      service.add({ id: 'id', title: 'title' }).subscribe();
      const req = httpTestingController.expectOne(url());
      expect(req.request.method).toEqual('POST');
      req.flush(null);
    });

    it('should send correct body', () => {
      service.add({ id: 'id', title: 'title' }).subscribe();
      const req = httpTestingController.expectOne(url());
      expect(req.request.body).toEqual({ id: 'id', title: 'title' });
      req.flush(null);
    });
  });

  describe('delete()', () => {
    it('should call correct url', () => {
      service.delete('id').subscribe();
      const req = httpTestingController.expectOne(url('id'));
      expect(req.request.method).toEqual('DELETE');
      req.flush(null);
    });
  });
});
