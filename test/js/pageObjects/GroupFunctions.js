import Page from './page';

class GroupFunctions extends Page {


    getGroup() { return this.browser.$("#group-option") }

    selectSet() {
        this.getGroup().click();
    }
}

export default new GroupFunctions;