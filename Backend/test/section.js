//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../bin/www')
const should = chai.should();
chai.use(chaiHttp);
var expect = chai.expect;


// check section exits
/*
 * Test the get exams by id
 */

describe('check section exits ', () => {
    describe('/laychitiet', () => {
        it('phienlambai exits True', (done) => {
            chai.request(server)
                .get('/phienlambai')
                .set('Authorization', `Bearer`)
                .end((err, res) => {
                    if (err) {
                        done(err);
                    }
                    else {
                        res.should.have.status(200);
                        console.log(res.text);
                        expect(res.text).to.eql('Section');
                        done();
                    }
                });
        });
    });
});


/*
 * Test the get PhienLamBai by id MaNguoiDung
 */

describe('PhienLamBai by id MaNguoiDung true ', () => {
    describe('/lay', () => {
        it('PhienLamBai by id MaNguoiDung True', (done) => {
            chai.request(server)
                .get('/phienlambai/lay/7')
                .set('Authorization', `Bearer`)
                .end((err, res) => {
                    if (err) {
                        done(err);
                    }
                    else {
                        res.should.have.status(200);
                        res.should.be.a('object');
                        console.log(res.text);
                        JSON.parse(res.text).should.have.property('success').eql(true);
                        done();
                    }
                });
        });
    });
});

/*
 * Test the get PhienLamBai by id MaNguoiDung
 */

describe('PhienLamBai by id MaNguoiDung false ', () => {
    describe('/lay', () => {
        it('PhienLamBai by id MaNguoiDung false', (done) => {
            chai.request(server)
                .get('/phienlambai/lay/7333')
                .set('Authorization', `Bearer`)
                .end((err, res) => {
                    if (err) {
                        done(err);
                    }
                    else {
                        res.should.have.status(200);
                        res.should.be.a('object');
                        console.log(res.text);
                        JSON.parse(res.text).should.have.property('success').eql(true);
                        JSON.parse(res.text).should.have.property('sections').to.deep.equal([]);
                        done();
                    }
                });
        });
    });
});

// -----  test batdau bai kiem tra-----

var item = {
    userID: 7,
    examID: 78,
    startTime: (new Date()).getTime()
}
sectionIDs = describe('batdau bai kiem tra true', (sectionIDs) => {
    describe('/phienlambai', (sectionIDs) => {
        it('batdau phien lam bai true', (done) => {
            chai.request(server)
                .post('/phienlambai/batdau')
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

var pool = require('../Middleware/database')
async function endphienlambaiTrue() {
    let getSectionIDQuery = "SELECT MaPhienLamBai FROM PhienLamBai WHERE MaPhienLamBai=(SELECT MAX(MaPhienLamBai) FROM PhienLamBai)"
    await pool.query(getSectionIDQuery, (error, result) => {
        if (error) throw error
        rss = JSON.parse(JSON.stringify(result))[0].MaPhienLamBai;
        var item3 = {
            userID: 7,
            examID: 78,
            choices: [],
            sectionID: rss,
            endTime: (new Date()).getTime()
        }
        describe('ket thuc bai kiem tra true', () => {
            describe('/phienlambai', () => {
                it('ket thuc phien lam bai true', (done) => {
                    chai.request(server)
                        .patch('/phienlambai/ketthuc')
                        .set('Authorization', `Bearer`)
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
                                JSON.parse(res.text).should.have.property('mark')
                                JSON.parse(res.text).should.have.property('score')
                                done();
                            }
                        });
                });
            });
        });
    });
}

endphienlambaiTrue();

async function endphienlambaifalse() {
    let getSectionIDQuery = "SELECT MaPhienLamBai FROM PhienLamBai WHERE MaPhienLamBai=(SELECT MAX(MaPhienLamBai) FROM PhienLamBai)"
    await pool.query(getSectionIDQuery, (error, result) => {
        if (error) throw error
        rss = JSON.parse(JSON.stringify(result))[0].MaPhienLamBai;
        var item3 = {
            userID: 74444,
            examID: 78,
            choices: [],
            sectionID: rss,
            endTime: (new Date()).getTime()
        }
        describe('ket thuc bai kiem tra false', () => {
            describe('/phienlambai', () => {
                it('ket thuc phien lam bai false', (done) => {
                    chai.request(server)
                        .patch('/phienlambai/ketthuc')
                        .set('Authorization', `Bearer`)
                        .send(item3)
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
    });
}

endphienlambaifalse();