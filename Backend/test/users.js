

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../bin/www')
const should = chai.should();


chai.use(chaiHttp);

/*
 * Test the /dangnhap True
 */
var item = {
    username: "admin2",
    password: "123456"
}

describe('Test Nguoi dung dang nhap', () => {
    describe('/dangnhap', () => {
        it('dang nhap True', (done) => {
            chai.request(server)
                .post('/nguoidung/dangnhap')
                .send(item)
                .end((err, res) => {
                    if (err) {
                        done(err);
                    }
                    else {
                        res.should.have.status(200);
                        res.should.be.a('object');
                        console.log(res.text)
                        JSON.parse(res.text).should.have.property('userID')
                        done();
                    }
                });
        });
    });
});

/*
 * Test the /dangnhap False
 */
var items2 = {
    username: "admin2",
    password: "fsdf"
}
describe('Test Nguoi dung dang nhap', () => {
    var data = JSON.stringify(items2);
    describe('/dangnhap', () => {
        it('dang nhap False', (done) => {
            chai.request(server)
                .post('/nguoidung/dangnhap')
                .send(data)
                .end((err, res) => {
                    if (err) {
                        done(err);
                    }
                    else {
                        res.should.have.status(200);
                        res.should.be.a('object');
                        console.log(res.text);
                        JSON.parse(res.text).response.should.have.property('success').eql(false);
                        done();
                    }
                });
        });
    });
});


// // ---------- test dang ki True-------------------
var date_ob = new Date();
var item3 = {
    fullname: "his" + date_ob.getTime(),
    grade: "4",
    email: "inputEmail" + date_ob + "@gmail.com",
    username: "his" + date_ob.getTime(),
    password: "inputPassword" + date_ob,
    repassword: "inputPassword" + date_ob
}
describe('Test Nguoi dung dang ki', () => {
    describe('/dangky', () => {
        it('dang ki True', (done) => {
            chai.request(server)
                .post('/nguoidung/dangky')
                .set('Authorization', `Bearer 669`)
                .send(item3)
                .end((err, res) => {
                    if (err) {
                        done(err);
                    }
                    else {
                        res.should.have.status(200);
                        res.should.be.a('object');
                        console.log(res.text)
                        JSON.parse(res.text).should.have.property('success').eql(true);
                        done();
                    }
                });
        });
    });
});


// // -----  test dang ki False-----
var item4 = {
    fullname: "his.state.inputFullname",
    grade: "4fff",
    email: "inputEmail" + "@gmail.com",
    username: "inputUsername",
    password: "inputPassword",
    repassword: "inputPassword"
}
describe('Test Nguoi dung dang ki', () => {
    describe('/dangky', () => {
        it('dang ki False', (done) => {
            chai.request(server)
                .post('/nguoidung/dangky')
                .set('Authorization', `Bearer 669`)
                .send(item4)
                .end((err, res) => {
                    if (err) {
                        done(err);
                    }
                    else {
                        res.should.have.status(200);
                        res.should.be.a('object');
                        console.log(res.text)
                        JSON.parse(res.text).should.have.property('success').eql(false);
                        done();
                    }
                });
        });
    });
});


// // -----  test Cập nhật thông tin true-----
var date_ob = new Date();
var item5 = {
    inputUsername: "test capnhatthongtin" + date_ob.getTime(),
    inputEmail: "capnhatthongtin@gmail.com" + date_ob.getTime(),
    inputFullname: "capnhatthongtin" + date_ob.getTime(),
    inputGrade: "3",
    error: false,
    errorMessage: '',
    errorCode: NaN,
    running: false
}
var data2 = {
    id: 150,
    info: item5
}
describe('Test capnhatthongtin true', () => {
    describe('/capnhatthongtin', () => {
        it('Cập nhật thông tin true', (done) => {
            chai.request(server)
                .patch('/nguoidung/capnhatthongtin')
                .set('Authorization', `Bearer 669`)
                .send(data2)
                .end((err, res) => {
                    if (err) {
                        done(err);
                    }
                    else {
                        res.should.have.status(200);
                        res.should.be.a('object');
                        console.log(res.text)
                        JSON.parse(res.text).should.have.property('success').eql(true);
                        done();
                    }
                });
        });
    });
});

// // -----  test Cập nhật thông tin false-----
var item6 = {
    inputUsername: "Lafier",
    inputEmail: "capnhatthongtin@gmail.com" + date_ob.getTime(),
    inputFullname: "capnhatthongtin" + date_ob.getTime(),
    inputGrade: "3",
    error: false,
    errorMessage: '',
    errorCode: NaN,
    running: false
}
var data3 = {
    id: "162",
    info: item6
}
describe('Test capnhatthongtin false', () => {
    describe('/capnhatthongtin', () => {
        it('Cập nhật thông tin inputUsername False ', (done) => {
            chai.request(server)
                .patch('/nguoidung/capnhatthongtin')
                .set('Authorization', `Bearer 669`)
                .send(data3)
                .end((err, res) => {
                    if (err) {
                        done(err);
                    }
                    else {
                        res.should.have.status(200);
                        res.should.be.a('object');
                        console.log(res.text)
                        JSON.parse(res.text).should.have.property('success').eql(false);
                        done();
                    }
                });
        });
    });
});


// // -----  test Cập nhật thông tin false-----
var item7 = {
    inputUsername: "Lafier" + date_ob.getTime(),
    inputEmail: "Abh@nation.com",
    inputFullname: "capnhatthongtin" + date_ob.getTime(),
    inputGrade: "3",
    error: false,
    errorMessage: '',
    errorCode: NaN,
    running: false
}
var data4 = {
    id: "162",
    info: item7
}
describe('Test capnhatthongtin email false', () => {
    describe('/capnhatthongtin', () => {
        it('Cập nhật thông tin email false', (done) => {
            chai.request(server)
                .patch('/nguoidung/capnhatthongtin')
                .set('Authorization', `Bearer 669`)
                .send(data4)
                .end((err, res) => {
                    if (err) {
                        done(err);
                    }
                    else {
                        res.should.have.status(200);
                        res.should.be.a('object');
                        console.log(res.text)
                        JSON.parse(res.text).should.have.property('success').eql(false);
                        done();
                    }
                });
        });
    });
});


// // -----  Test capnhatmatkhau true-----
var item8 = {
    oldPassword: '123456',
    newPassword: '123456',
    reNewPassword: '123456',
    error: false,
    errorMessage: '',
    errorCode: NaN,
    running: false
}
var data5 = {
    id: 168,
    info: item8
}
describe('Test capnhatmatkhau true', () => {
    describe('/capnhatmatkhau', () => {
        it('cap nhat mat khau  true', (done) => {
            chai.request(server)
                .patch('/nguoidung/capnhatmatkhau')
                .set('Authorization', `Bearer 669`)
                .send(data5)
                .end((err, res) => {
                    if (err) {
                        done(err);
                    }
                    else {
                        res.should.have.status(200);
                        res.should.be.a('object');
                        console.log(res.text)
                        JSON.parse(res.text).should.have.property('success').eql(true);
                        done();
                    }
                });
        });
    });
});

// // -----  Test capnhatmatkhau  false-----
var item9 = {
    oldPassword: '12345633',
    newPassword: '123456',
    reNewPassword: '123456',
    error: false,
    errorMessage: '',
    errorCode: NaN,
    running: false
}
var data6 = {
    id: 168,
    info: item9
}
describe('Test capnhatmatkhau false', () => {
    describe('/capnhatmatkhau', () => {
        it('cap nhat mat khau  false', (done) => {
            chai.request(server)
                .patch('/nguoidung/capnhatmatkhau')
                .set('Authorization', `Bearer 669`)
                .send(data6)
                .end((err, res) => {
                    if (err) {
                        done(err);
                    }
                    else {
                        res.should.have.status(200);
                        res.should.be.a('object');
                        console.log(res.text)
                        JSON.parse(res.text).should.have.property('success').eql(false);
                        done();
                    }
                });
        });
    });
});

// -----  get userID-----

describe('Test get userID 168 true', () => {
    describe('/get userID 168', () => {
        it('get userID true', (done) => {
            chai.request(server)
                .get('/nguoidung/lay/168')
                .set('Authorization', `Bearer 669`)
                .end((err, res) => {
                    if (err) {
                        done(err);
                    }
                    else {
                        res.should.have.status(200);
                        res.should.be.a('object');
                        console.log(res.text)
                        JSON.parse(res.text).should.have.property('success').eql(true);
                        done();
                    }
                });
        });
    });
});

// -----  get userID-----

describe('Test get userID 167778 false', () => {
    describe('/get userID 167778', () => {
        it('get userID false', (done) => {
            chai.request(server)
                .get('/nguoidung/lay/167778')
                .set('Authorization', `Bearer 669`)
                .end((err, res) => {
                    if (err) {
                        done(err);
                    }
                    else {
                        res.should.have.status(200);
                        res.should.be.a('object');
                        console.log(res.text)
                        JSON.parse(res.text).should.have.property('success').eql(true);
                        JSON.parse(res.text).should.have.property('info').to.deep.equal([]);
                        
                        done();
                    }
                });
        });
    });
});