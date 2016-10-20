import { browser, element, by } from 'protractor/globals';

export class BoomjsPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('boom-app-root h1')).getText();
  }
}
