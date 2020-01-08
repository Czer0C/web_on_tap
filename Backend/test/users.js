

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../bin/www')
const should = chai.should();


chai.use(chaiHttp);

describe('Test Nguoi dung dang nhap', () => {
    /*
     * Test the /dangnhap True
     */
    let item = {
        username: "admin2",
        password: "123456"
    }
    
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


describe('Test Nguoi dung dang nhap', () => {
    /*
     * Test the /dangnhap False
     */
    let items = {
        username: "admin2",
        password: "fsdf"
    }
    var data= JSON.stringify(items);
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


// ---------- test dang ki True-------------------

describe('Test Nguoi dung dang ki', () => {

    let date_ob = new Date();
    let item = {
        fullname: "his" + date_ob.getTime(),
        grade: "4",
        email: "inputEmail"+date_ob+"@gmail.com",
        username: "his" + date_ob.getTime(),
        password: "inputPassword"+date_ob,
        repassword: "inputPassword"+date_ob
    }

    describe('/dangky', () => {
        it('dang ki True', (done) => {
            chai.request(server)
                .post('/nguoidung/dangky')
                .set('Authorization', `Bearer 669`)
                .send(item)
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


// -----  test dang ki False-----

describe('Test Nguoi dung dang ki', () => {

    let item = {
        fullname: "his.state.inputFullname" ,
        grade: "4fff",
        email: "inputEmail"+"@gmail.com",
        username: "inputUsername",
        password: "inputPassword",
        repassword: "inputPassword"
    }
    describe('/dangky', () => {
        it('dang ki False', (done) => {
            chai.request(server)
                .post('/nguoidung/dangky')
                .set('Authorization', `Bearer 669`)
                .send(item)
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