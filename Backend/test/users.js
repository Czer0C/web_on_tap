

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../bin/www')
const should = chai.should();


chai.use(chaiHttp);

// describe('Nguoi dung', () => {
//     /*
//      * Test the /dangnhap True
//      */
//     let item = {
//         username: "Lê Văn A",
//         password:  "123456"
//     }
//     var data=JSON.stringify(item);
//     describe('/dangnhap', () => {
//         it('dang nhap True', (done) => {
//             chai.request(server)
//                 .get('/nguoidung/lay')
//                 .send(data)
//                 .end((err, res) => {
//                      console.log(res)
//                 });
//         });
//     });
// });

describe('/GET/:id pets', () => {
    it('', (done) => {
        chai.request(server)
            .get('/nguoidung/lay')
            .end((err, res) => {   
                done();
            });
    });
});