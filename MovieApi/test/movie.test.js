const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../app');

chai.use(chaiHttp);

let token,movieId;

//testlerinizin ne testi olduğunu,açıklamasını giriyoruz buraya
describe('Movies Testleri', () => {
    //testler başlamadan önce çalışır
    before((done) => {
        chai.request(server)
            .post('/authenticate')
            .send({
                username: 'de',
                password: "123456"
            })
            .end((err, res) => {
                token = res.body.token;
                done();
            });
    });


    describe('/GET movies', () => {
        it('it should get all the movies', (done) => {
            chai.request(server)
                .get('/api/movie')
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        })
    });

    describe('/POST movie',()=>{
        it('it should POST a movie',(done)=>{
            const movie={
                title:'Totti',
                category:'Komedi',
                country:'Italya',
                year:1976,
                imdb_score:10
            };
            chai.request(server)
            .post('/api/movie')
            .send(movie)
            .set('x-access-token', token)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                movieId = res.body._id;
                // res.body.should.have.property('title');
                // res.body.should.have.property('category');
                // res.body.should.have.property('country');
                // res.body.should.have.property('year');
                // res.body.should.have.property('imdb_score');
                done();
            });
        })
    })

    describe('/GET movie ',()=>{
        it('it should be GET a movie by the given id',(done)=>{
            chai.request(server)
            .get('/api/movie/'+movieId)
            .set('x-access-token', token)
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.have.property('_id').eql(movieId);
                done();
            });
        });
    });

    describe('/PUT movie',()=>{
        it('it should Update a movie given by Id',(done)=>{
            const movie={
                title:'Totti',
                category:'Komedi',
                country:'Italya',
                year:1976,
                imdb_score:10
            };
            chai.request(server)
            .put('/api/movie/'+movieId)
            .send(movie)
            .set('x-access-token', token)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
        })
    });

    describe('/Delete movie',()=>{
        it('it should Delete a movie given by Id',(done)=>{
            chai.request(server)
            .delete('/api/movie/'+movieId)
            .set('x-access-token', token)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('status').eql(1);
                done();
            });
        })
    })
});