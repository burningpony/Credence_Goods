import Page from './page';

class TestFunctions extends Page {
    getTitle() { return this.browser.$("#title") }
    getButton() { return this.browser.$("button[name=continue]") }

    continue(){
        this.getButton().click();
    }
}

export default new TestFunctions;