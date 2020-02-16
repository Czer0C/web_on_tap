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