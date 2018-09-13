import { AnnoucementModule } from './annoucement.module';

describe('AnnoucementModule', () => {
  let annoucementModule: AnnoucementModule;

  beforeEach(() => {
    annoucementModule = new AnnoucementModule();
  });

  it('should create an instance', () => {
    expect(annoucementModule).toBeTruthy();
  });
});
