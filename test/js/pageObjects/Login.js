
class Login {

    login (username="user", password="123456789") {
         browser.url("http://"+username+":"+password+"@localhost:3000/");
    }
    open() {
        browser.url("http://localhost:3000/");
   }
   
};
export default new Login;