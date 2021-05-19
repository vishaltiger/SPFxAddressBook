export function ValidateEmail(inputText) {
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (inputText.match(mailformat)) {
        return true;
    }
    else {
        alert("You have entered an invalid email address!");
        return false;
    }
}
export function Validatephonenumber(inputtxt) {
    if (typeof (inputtxt) != "string") {
        inputtxt = inputtxt.toString();
    }
    var phoneno = /^\d{10}$/;
    if (inputtxt.match(phoneno)) {
        return true;
    }
    else {
        alert("Enter Valid Phone Number");
        return false;
    }
}