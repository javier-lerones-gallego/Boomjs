import { BoomjsPage } from './app.po';

describe('boomjs App', function() {
  let page: BoomjsPage;

  beforeEach(() => {
    page = new BoomjsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
