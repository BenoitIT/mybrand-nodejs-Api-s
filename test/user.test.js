import chai from"chai";
import chaiHttp from"chai-http";
import User from "../src/models/users"
import server from "./server.test";
chai.should();
chai.use(chaiHttp);
describe('registering a user',()=>{
    beforeEach(async () => {
        try {
          await User.deleteMany({});
        } catch (error) {
        }
      });

    it('it should create a new user', (done) => {
      chai
        .request(server)
        .post('/Api/admin/register')
        .send({
          email: "ben@test.com",
          userName: "tester",
          password:'password1',
          refreshToken:''
        })
        .end((err, res) => {
          res.should.have.status(201);
          done();
        });
    });
  
});

describe('testing Login routes', () => {
  it('it should not login without email and password', (done) => {
    const loginData = {};
    chai.request(server)
      .post('/Api/admin/login')
      .send(loginData)
      .end((err, res) => {
        res.should.have.status(403);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('enter email and password');
        done();
      });
  });
});
describe('Testing login routes', () => {
  let token;
  it('it should log in into system ', (done) => {
    chai
      .request(server)
      .post('/Api/admin/login')
      .send({
        email: "ben@test.com",
        password: "password1",
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("message");
        res.body.should.have.property("data");
        token = res.body.data;
        done();
      });
  });
})