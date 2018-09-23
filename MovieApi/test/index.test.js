const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../app');

chai.use(chaiHttp);

//testlerinizin ne testi olduğunu,açıklamasını giriyoruz buraya
describe('Node Server',()=>{
    it('(GET /) ana sayfayı döndürür',(done)=>{
        chai.request(server)
        .get('/')
        .end((err,res)=>{
            res.should.have.status(200);
            done();
        });
    });
});