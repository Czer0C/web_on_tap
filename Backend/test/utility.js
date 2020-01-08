
var utility = require('../utility/utility')
//Require the dev-dependencies
describe('Test validateRegister', () => {
   
   
    let item = {
        fullname: "his.state.inputFullname",
        grade: "4",
        email: "inputEmail@gmail.com",
        username: "inputUsername",
        password: "inputPassword",
        repassword: "inputPassword"
    }

    describe('Check validateRegister True', () => {
        it('Check validateRegister True', (done) => {
            var res=utility.validateRegister(item);
            if(res.code==0){
                done();
            }
            else{
                done(res.message);
            }
        });
    });
});

describe('Test validateRegister', () => {
   
   
    let item = {
        fullname: "his.state.inputFullname",
        grade: "erwer",
        email: "inputEmail@gmail.com",
        username: "inputUsername",
        password: "inputPassword",
        repassword: "inputPassword"
    }
    describe('Check validateRegister False', () => {
        it('Check validateRegister False', (done) => {
            var res=utility.validateRegister(item);
            if(res.code==0){
                done("phai nhap sai");
            }
            else{
                done();
            }
        });
    });
});

describe('Test validateNewPassword', () => {
   
   
    let info={
        oldPassword: "this.state",
        newPassword: "this.state",
        reNewPassword: "this.state"
    }

    describe('Check validateNewPassword True', () => {
        it('Check validateNewPassword True', (done) => {
            var res=utility.validateNewPassword(info);
            if(res.code==0){
                done();
            }
            else{
                done(res.message);
            }
        });
    });
});

describe('Test validateNewPassword', () => {
    
   
    let info={
        oldPassword: "this.state.inputOldPassword",
        newPassword: "this.state.inputNewPassword",
        reNewPassword: "this.state.inputReNewPassword"
    }

    describe('Check validateNewPassword False', () => {
        it('Check validateNewPassword False', (done) => {
            var res=utility.validateNewPassword(info);
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

describe('Test validateUpdateUser', () => {
    let state = {
        inputUsername: "TenDangNhap",
        inputEmail: "Email",
        inputFullname: "HoTen",
        inputGrade: "5",
        error: false,
        errorMessage: '',
        errorCode: NaN,
        running: false
    }

    describe('Check validateUpdateUser True', () => {
        it('Check validateUpdateUser True', (done) => {
            var res=utility.validateUpdateUser(state);
            if(res.code==0){
                done();
            }
            else{
                done(res.message);
            }
        });
    });
});

describe('Test validateUpdateUser', () => {
    let state = {
        inputUsername: "TenDangNhap",
        inputEmail: "Email",
        inputFullname: "HoTen",
        inputGrade: "eeee",
        error: false,
        errorMessage: '',
        errorCode: NaN,
        running: false
    }

    describe('Check validateUpdateUser False', () => {
        it('Check validateUpdateUser False', (done) => {
            var res=utility.validateUpdateUser(state);
            if(res.code==0){
                done("Phai nhap sai");
            }
            else{
                done();
            }
        });
    });
});