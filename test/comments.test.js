const chai = require("chai");
const expect = require("chai").expect();
const chaiHttp = require("chai-http");
import server from "./server.test";
const should = chai.should();
chai.use(chaiHttp);

describe("testing messages Api", () => {
  /**
   * testing get all blogs routes
   */
  it("it should GET all the messages", (done) => {
    chai
      .request(server)
      .get("/Api/blogs/all")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });
  it("it should GET single message", (done) => {
    const param = "63bd0e90a59b4c02537643ae";
    chai
      .request(server)
      .get("/Api/messages/"+ param)
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
      .delete("/Api/messages/message/" + param)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});
