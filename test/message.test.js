import chai from"chai";
import chaiHttp from"chai-http";
import server from "./server.test";
chai.should();
chai.use(chaiHttp);
describe('sending a message',()=>{
/**
* testing get all message routes
*/
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
       done();
     });
 });
});
describe('GET all messages from the users', () => {
  let token;

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
    const param = "63bd0e90a59b4c02537643ae";
    chai
    .request(server)
    .get("/Api/message/message/"+ param)
    .end((err, res) => {
      res.should.have.status(400);
      res.body.should.be.a("object");
      done();
    });
  });
  
  it("it should delete the message with matching id by authorized user", (done) => {
    const param = "63bd0e90a59b4c02537643ae";
    chai
    .request(server)
    .delete("/Api/messages/message/delete/" + param)
    .end((err, res) => {
      res.should.have.status(400);
      done();
    });
  });
});