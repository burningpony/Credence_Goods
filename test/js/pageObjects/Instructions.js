import Page from './page';

class Instructions extends Page {


    roleLabel() { return this.browser.$("#role") }

    sendButton() { return this.browser.$("button") }
    
    continue () {
        this.sendButton().click()

    }
}

export default new Instructions;