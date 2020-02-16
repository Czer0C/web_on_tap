//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../bin/www')
const should = chai.should();
chai.use(chaiHttp);

/*
 * Test the get exams by id
 */

describe('Test get exam ', () => {
    describe('/laychitiet', () => {
        it('laychitiet True', (done) => {
            chai.request(server)
                .get('/baikiemtra/laychitiet/71')
                .set('Authorization', `Bearer`)
                .end((err, res) => {
                    if (err) {
                        done(err);
                    }
                    else {
                        res.should.have.status(200);
                        res.should.be.a('object');
                        // console.log(res.text)
                        JSON.parse(res.text).should.have.property('success').eql(true);
                        done();
                    }
                });
        });
    });
});

/*
 * Test the get exams by id
 */

describe('Test get exam ', () => {
    describe('/laychitiet', () => {
        it('laychitiet False', (done) => {
            chai.request(server)
                .get('/baikiemtra/laychitiet/2sdfw')
                .set('Authorization', `Bearer`)
                .end((err, res) => {
                    if (err) {
                        done(err);
                    }
                    else {
                        res.should.have.status(200);
                        res.should.be.a('object');
                        console.log(res.text)
                        // JSON.parse(res.text).should.have.property('success').eql(false);
                        JSON.parse(res.text).should.have.property('questions').to.deep.equal([]);
                        JSON.parse(res.text).should.have.property('choices').to.deep.equal([]);
                        done();
                    }
                });
        });
    });
});

/*
 * Test the get exams by id
 */

describe('Test get BaiKiemTra', () => {
    describe('/lay', () => {
        it('lay True', (done) => {
            chai.request(server)
                .get('/baikiemtra/lay')
                .set('Authorization', `Bearer`)
                .end((err, res) => {
                    if (err) {
                        done(err);
                    }
                    else {
                        res.should.have.status(200);
                        res.should.be.a('object');
                        // console.log(res.text)
                        JSON.parse(res.text).should.have.property('success').eql(true);
                        done();
                    }
                });
        });
    });
});

 /*
 * Test the get BaiKiemTra by id
 */

describe('Test get BaiKiemTra by id ', () => {
    describe('/lay/id', () => {
        it('lay BaiKiemTra True', (done) => {
            chai.request(server)
                .get('/baikiemtra/lay/71')
                .set('Authorization', `Bearer`)
                .end((err, res) => {
                    if (err) {
                        done(err);
                    }
                    else {
                        res.should.have.status(200);
                        res.should.be.a('object');
                        // console.log(res.text)
                        JSON.parse(res.text).should.have.property('success').eql(true);
                        JSON.parse(res.text).should.have.property('examInfo').to.not.deep.equal('[t]');
                        JSON.parse(res.text).should.have.property('questionInfo').to.not.deep.equal('[]');
                        JSON.parse(res.text).should.have.property('choiceInfo').to.not.deep.equal('[]');
                        done();
                    }
                });
        });
    });
});

/*
 * Test the get BaiKiemTra by id
 */

describe('Test get BaiKiemTra by id false', () => {
    describe('/lay/id false', () => {
        it('lay BaiKiemTra False', (done) => {
            chai.request(server)
                .get('/baikiemtra/lay/3333333333')
                .set('Authorization', `Bearer`)
                .end((err, res) => {
                    if (err) {
                        done(err);
                    }
                    else {
                        res.should.have.status(200);
                        res.should.be.a('object');
                        console.log(res.text)
                        // JSON.parse(res.text).should.have.property('success').eql(false);
                        JSON.parse(res.text).should.have.property('examInfo').to.deep.equal('[]');
                        JSON.parse(res.text).should.have.property('questionInfo').to.deep.equal('[]');
                        JSON.parse(res.text).should.have.property('choiceInfo').to.deep.equal('[]');
                        done();
                    }
                });
        });
    });
});

// -----  test them bai kiem tra-----
var date_ob = new Date();
var questionList = [{ ID: 0, examID: '', content: '' },{ ID: 1, examID: '', content: '' }];
var choiceList=[{ ID: 0, examID: '', content: '' },{ ID: 1, examID: '', content: '' }];

var item = {
    examName : "this.state.examName" + date_ob.getTime(),
    semester : 1,
    grade : 1,
    duration : 10,
    title : "this.state.title" + date_ob.getTime(),
    content : "this.state.content" + date_ob.getTime(),
    author : "this.state.author" + date_ob.getTime(),
    note : "this.state.note" + date_ob.getTime(),
    questionList: questionList,
    choiceList: choiceList
}
describe('them bai kiem tra true', () => {
    describe('/them', () => {
        it('them true', (done) => {
            chai.request(server)
                .post('/baikiemtra/them')
                .set('Authorization', `Bearer`)
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

// -----  test them bai kiem tra-----
var date_ob2 = new Date();
var questionList2 = [{ ID: "11110", examID: '', content: '' },{ ID: 1, examID: '', content: '' }];
var choiceList2=[{ ID: 0, examID: '', content: '' },{ ID: 1, examID: '', content: '' }];

var item2 = {
    examName : "this.state.examName" + date_ob2.getTime(),
    semester : 1,
    grade : 1,
    duration : 10,
    title : "this.state.title" + date_ob2.getTime(),
    content : "this.state.content" + date_ob2.getTime(),
    author : "this.state.author" + date_ob2.getTime(),
    note : "this.state.note" + date_ob2.getTime(),
    questionList: questionList2,
    choiceList: choiceList2
}
describe('them bai kiem tra false', () => {
    describe('/them', () => {
        it('them false', (done) => {
            chai.request(server)
                .post('/baikiemtra/them')
                .set('Authorization', `Bea  s`) // change token that false
                .send(item2)
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