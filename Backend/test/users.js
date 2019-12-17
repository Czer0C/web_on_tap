
//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../bin/www');
const should = chai.should();


chai.use(chaiHttp);

describe('bai kiem tra', () => {
    /*
     * Test the /GET laybaikiemtra
     */
    describe('/GET laybaikiemtra', () => {
        it('it should GET all the laybaikiemtra', (done) => {
            chai.request(server)
                .get('/users/laybaikiemtra')
                .end((err, res) => {
                    res.should.have.status(200);
                    // res.body.should.be.a('array');
                    // console.log(JSON.stringify(res.text));
                    done();
                });
        });
    });

    /*
     * Test the thongtinbaikiemtra/:examID
     */
    describe('thongtinbaikiemtra tu 1 -> 50', () => {
        for(let i=0;i<50;i++){
            it('it should GET the thongtinbaikiemtra/'+i, (done) => {
                chai.request(server)
                    .get('/users/thongtinbaikiemtra/'+i)
                    .end((err, res) => {
                        res.should.have.status(200);
                        // res.body.should.be.a('array');
                        done();
                    });
            });
        }
    });

});

describe('Nguoi dung', () => {

    /*
     * Test the thongtincanhan/:examID
     */
    describe('thongtincanhan tu 1 -> 50', () => {
        for(let i=0;i<50;i++){
            it('it should GET the thongtincanhan/'+i, (done) => {
                chai.request(server)
                    .get('/users/thongtincanhan/'+i)
                    .end((err, res) => {
                        res.should.have.status(200);
                        // res.body.should.be.a('array');
                        done();
                    });
            });
        }
    });

    /*
     * Test the /GET laynguoidung
     */
    describe('/GET laynguoidung', () => {
        it('it should GET all the laynguoidung', (done) => {
            chai.request(server)
                .get('/users/laynguoidung')
                .end((err, res) => {
                    res.should.have.status(200);
                    // res.body.should.be.a('array');
                    // console.log(JSON.stringify(res.text));
                    done();
                });
        });
    });

});