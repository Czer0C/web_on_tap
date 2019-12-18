
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

    /*
     * Test the /POST bai kiem tra
     */ 

    /*
     * Test the batdaulambai 
     */
    describe('batdaulambai tu 1 -> 50', () => {
        for(let i=0;i<50;i++){
            it('it should post the batdaulambai/'+i, (done) => {
                let data={
                    userID: i,
                    examID: i,
                    startTime: (new Date()).getTime()
                }
                chai.request(server)
                    .post("/users/batdaulambai")
                    .send(data)
                    .end((err,res)=>{
                        // res.should.have.status(200);
                         console.log(res.text);
                        done();
                    });
            });
        }
    });

    

    /*
     * Test the batdaulambai 
     */
    describe('thembaikiemtra tu 1 -> 50', () => {
        for(let i=0;i<50;i++){
            it('it should post the thembaikiemtra/'+i, (done) => {
                var item = {
                    examName : 'Bài kiểm tra Unit Test '+i,
                    semester : 4,
                    grade : 5,
                    duration : 30,
                    title : 'Titel Test'+i,
                    content : 'Content Test'+i,
                    author : 'Khoa học tu nhiên',
                    note : 'none',
                    questionList: [
                        {
                            ID:i,
                            newExamID:'new'+i,
                            content:'Content '+i
                        },
                        {
                            ID:i*10,
                            newExamID:'new'+(i*10),
                            content:'Content '+(i*10)
                        },
                    ],
                    choiceList:[
                        {
                            ID:  i ,
                            questionID:  i ,
                            newExamID:   'new '+i,
                            content:   'content '+i, 
                            isCorrect:   1,
                        },
                        {
                            ID:  i*10 ,
                            questionID:  i*10 ,
                            newExamID:   'new '+(i*10),
                            content:   'content '+(i*10), 
                            isCorrect:  2,
                        }
                    ]
                }
                chai.request(server)
                    .post("/users/thembaikiemtra")
                    .send(item)
                    .end((err,res)=>{
                        // res.should.have.status(200);
                         console.log(res.text);
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