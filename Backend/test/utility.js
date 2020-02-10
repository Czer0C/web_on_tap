
var utility = require('../utility/utility')

//Require the dev-dependencies
var item1 = {
    fullname: "his.state.inputFullname",
    grade: "4",
    email: "inputEmail@gmail.com",
    username: "inputUsername",
    password: "inputPassword",
    repassword: "inputPassword"
}
describe('Test validateRegister', () => {
    describe('Check validateRegister True', () => {
        it('Check validateRegister True', (done) => {
            var res=utility.validateRegister(item1);
            if(res.code==0){
                done();
            }
            else{
                done(res.message);
            }
        });
    });
});

var item2 = {
    fullname: "his.state.inputFullname",
    grade: "erwer",
    email: "inputEmail@gmail.com",
    username: "inputUsername",
    password: "inputPassword",
    repassword: "inputPassword"
}
describe('Test validateRegister', () => {
    describe('Check validateRegister False', () => {
        it('Check validateRegister False', (done) => {
            var res=utility.validateRegister(item2);
            if(res.code==0){
                done("phai nhap sai");
            }
            else{
                done();
            }
        });
    });
});

var item3={
    oldPassword: "this.state",
    newPassword: "this.state",
    reNewPassword: "this.state"
}
describe('Test validateNewPassword', () => {
    describe('Check validateNewPassword True', () => {
        it('Check validateNewPassword True', (done) => {
            var res=utility.validateNewPassword(item3);
            if(res.code==0){
                done();
            }
            else{
                done(res.message);
            }
        });
    });
});

var item4={
    oldPassword: "this.state.inputOldPassword",
    newPassword: "this.state.inputNewPassword",
    reNewPassword: "this.state.inputReNewPassword"
}
describe('Test validateNewPassword', () => {
    describe('Check validateNewPassword False', () => {
        it('Check validateNewPassword False', (done) => {
            var res=utility.validateNewPassword(item4);
            if(res.code==0){
                done("Phai nhap sai");
            }
            else{
                done();
            }
        });
    });
});

// -------------validateUpdateUser

var item5 = {
    inputUsername: "TenDangNhap",
    inputEmail: "Email",
    inputFullname: "HoTen",
    inputGrade: "5",
    error: false,
    errorMessage: '',
    errorCode: NaN,
    running: false
}
describe('Test validateUpdateUser', () => {
    describe('Check validateUpdateUser True', () => {
        it('Check validateUpdateUser True', (done) => {
            var res=utility.validateUpdateUser(item5);
            if(res.code==0){
                done();
            }
            else{
                done(res.message);
            }
        });
    });
});

var item6 = {
    inputUsername: "TenDangNhap",
    inputEmail: "Email",
    inputFullname: "HoTen",
    inputGrade: "eeee",
    error: false,
    errorMessage: '',
    errorCode: NaN,
    running: false
}
describe('Test validateUpdateUser', () => {
    describe('Check validateUpdateUser False', () => {
        it('Check validateUpdateUser False', (done) => {
            var res=utility.validateUpdateUser(item6);
            if(res.code==0){
                done("Phai nhap sai");
            }
            else{
                done();
            }
        });
    });
});