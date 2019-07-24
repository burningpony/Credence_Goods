import Page from './page';

class SelectGroup extends Page {


    groupNameLabel() { return this.browser.$("label"); }
    groupNameInput() { return this.browser.$("input[name=group]"); }

    sendButton() { return this.browser.$("button") }
    
    selectGroup () {

        this.groupNameInput().setValue("test")
        this.sendButton().click()

    }
}

export default new SelectGroup;