import { NasastuffPage } from './app.po';

describe('nasastuff App', function() {
  let page: NasastuffPage;

  beforeEach(() => {
    page = new NasastuffPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
