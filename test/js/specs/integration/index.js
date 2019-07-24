const assert = require('assert');

describe('webdriver.io page', () => {
    
    it('should have the right title', () => {
      //full run of the experiment
      const authLogin = browser.url("http://user:123456789@localhost:3000/");
      chromeOne.url("http://localhost:3000/")
      chromeTwo.url("http://localhost:3000/")
      //You Will be the player: B
      //choose group
      chromeOne.$("input[name=group]").setValue("test")
      chromeOne.$("button").click();
      chromeOne.pause(1000);

      chromeTwo.$("input[name=group]").setValue("test")
      chromeTwo.$("button").click();
      chromeTwo.pause(1000);
      //instructions
      const role = chromeOne.$("#role").getText();
      const player_a = (role ==="You Will be the player: A") ? chromeOne : chromeTwo
      const player_b = !(role ==="You Will be the player: A") ? chromeOne : chromeTwo      
      browser.$("button").click();
      browser.pause(2000);
      //test part
      let functions = chromeOne.$$("#function");
      functions.forEach(element => {
          element.$("input[name=valueCoordinate]").setValue("2")
          element.$("button[name=valueCoordinate]").click();

          element.$("input[name=points]").setValue("10")
          element.$("button[name=points]").click();

          element.$("input[name=prediction]").setValue("20")
          element.$("button[name=prediction]").click();
      });
      browser.$("button[name=continue]").click();
      browser.pause(1000);
      //group selection
      browser.$("#group-option").click();
      //part 1
      functions = chromeOne.$$("#function");
      functions.forEach(element => {
        element.$("input[name=valueCoordinate]").setValue("2")
        element.$("button[name=valueCoordinate]").click();

        element.$("input[name=points]").setValue("10")
        element.$("button[name=points]").click();

        element.$("input[name=prediction]").setValue("20")
        element.$("button[name=prediction]").click();
      });
      browser.$("button[name=continue]").click();
      //payment
      browser.$("#continue").click();
      //quiz
      const questions = browser.$$("#question");
      

      browser.$("button[name=submitQuiz]").click();
      //part2
      player_b.pause(1000);
      player_a.pause(1000);
      //match
      player_b.$("button").click();
      player_a.$("button").click();
      //quiz
      player_b.$("button").click();
      //group selection
      player_b.$("#group-option").click();
      //fill functions
      
      functions = player_b.$$("#function");
      functions.forEach(element => {
        element.$("input[name=valueCoordinate]").setValue("2")
        element.$("button[name=valueCoordinate]").click();

        element.$("input[name=points]").setValue("10")
        element.$("button[name=points]").click();

        element.$("input[name=prediction]").setValue("20")
        element.$("button[name=prediction]").click();
      });
      browser.pause(2000);
      player_b.$("button[name=finish]").click();

      browser.pause(2000);
    }); 
});