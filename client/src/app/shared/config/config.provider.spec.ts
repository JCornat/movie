import { TestBed } from '@angular/core/testing';
import { APP_CONFIG, getConfig } from './config.provider';
import { AppConfig } from '@app/interface';

describe('Config provider', () => {
  let config: AppConfig;

  beforeEach(async () => {
    config = {
      SERVER_URL: 'server_url',
      TITLE: 'title',
      META_TAGS: [],
    };

    await TestBed.configureTestingModule({
      providers: [
        {
          provide: APP_CONFIG, useValue: config,
        },
      ],
    }).compileComponents();
  });

  describe('getConfig()', () => {
    it('should return correct values', () => {
      TestBed.runInInjectionContext(() => {
        expect(getConfig('TITLE')).toEqual(config.TITLE);
        expect(getConfig('SERVER_URL')).toEqual(config.SERVER_URL);
        expect(getConfig('META_TAGS')).toEqual(config.META_TAGS);
      });
    });
  });
});
