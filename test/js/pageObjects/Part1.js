import Page from './page';

class Part1 extends Page {


    getFunctions() { return this.browser.$$("#function") }

    getContinueButton(){ return this.browser.$("button[name=continue]") }

    fillPart1() {
        this.getFunctions().forEach(element => {
            element.$("input[name=valueCoordinate]").setValue("2")
            element.$("button[name=valueCoordinate]").click();
    
            element.$("input[name=points]").setValue("10")
            element.$("button[name=points]").click();
    
            element.$("input[name=prediction]").setValue("20")
            element.$("button[name=prediction]").click();
          });

          this.getContinueButton().click();
    }
}

export default new Part1;