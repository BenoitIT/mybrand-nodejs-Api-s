import chai from"chai";
import chaiHttp from"chai-http";
import server from "./server.test";
chai.should();
chai.use(chaiHttp);
let token;
let messID;
describe('sending a message',()=>{
/**
* testing get all message routes
*/
before(async () => {
  const response = await chai
    .request(server)
    .post('/Api/admin/login')
    .send({
      email: 'test@test.com',
      password: 'password1'
    });
    token = response.body.data;
});
it('sender must fill all names, email and message', (done) => {
   const post = {
     senderName: 'ben',
     senderEmail: 'ben@gmail.com',
     message: 'first messages',
   };
   chai
     .request(server)
     .post('/Api/messages/new')
     .send(post)
     .end((err, res) => {
       res.should.have.status(201);
       res.body.should.have.property('message');
       res.body.should.have.property('data');
        messID=res.body.data._id
       done();
     });
 });
});
describe('GET all messages from the users', () => {

  it('it should GET all the messages', (done) => {
    chai
    .request(server)
    .get('/Api/messages/all')
    .set('Authorization',`Bearer ${token}`)
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.have.property('message');
      done();
    });
  });
});
describe("testing messages Api", () => {
  /**
   * testing get all message routes
  */
 it("it should GET single message", (done) => {
   chai
   .request(server)
   .get(`/Api/messages/message/${messID}`)
   .set('Authorization',`Bearer ${token}`)
   .end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a("object");
      res.body.should.have.property('message');
      done();
    });
  });
  it("it should not GET single message", (done) => {
    const param = "63bd0e90a59b4c02537643ae";
    chai
    .request(server)
    .get(`/Api/messages/message/${param}`)
    .set('Authorization',`Bearer ${token}`)
    .end((err, res) => {
      res.should.have.status(404);
      done();
    });
  });
  it("it should delete the message with matching id by authorized user", (done) => {
    chai
    .request(server)
    .delete(`/Api/messages/message/delete/${messID}`)
    .set('Authorization',`Bearer ${token}`)
    .end((err, res) => {
      res.should.have.status(204);
      done();
    });
  });
  it("it should not delete the message with matching id by authorized user", (done) => {
    const param = "63bd0e90a59b4c02537643ae";
    chai
    .request(server)
    .delete("/Api/messages/message/delete/" + param)
    .set('Authorization',`Bearer ${token}`)
    .end((err, res) => {
      res.should.have.status(404);
      done();
    });
  });
});