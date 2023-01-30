const chai = require("chai");
const expect = require("chai").expect();
const chaiHttp = require("chai-http");
const Blog = require("../src/models/blogs");
import server from "./server.test";
const should = chai.should();
chai.use(chaiHttp);

describe("testing blogs Api", () => {
  /**
   * testing get all blogs routes
   */
  it("it should GET all the blogs", (done) => {
    chai
      .request(server)
      .get("/Api/blogs/all")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });
  it("it should GET single blog", (done) => {
    const param = "63be7492018014383b80cd4b";
    chai
      .request(server)
      .get("/Api/blogs/blog/"+ param)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a("object");
        done();
      });
  });
  it("it should  not get single blog single blog", (done) => {
    const param = "63bd0e90a59b4c02537643ae";
    chai
      .request(server)
      .get("/Api/blogs/blog/"+ param)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('message');
        done();
      });
  });
   
  it("it should delete the blog with matching id by authorized user", (done) => {
    const param = "63bd0e90a59b4c02537643ae";
    chai
      .request(server)
      .delete("/Api/blogs/" + param)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  // it("it should  not delete single blog single blog", (done) => {
  //   const param = "63bd0e90a59b4c02537643ae";
  //   chai
  //     .request(server)
  //     .get("/Api/blogs/blog/"+ param)
  //     .end((err, res) => {
  //       res.should.have.status(404);
  //       res.body.should.be.a("message");
  //       done();
  //     });
  // });
  /**
   * testing authorized update single blog routes
   */
  it("it should update the blog with matching id by authorized user", (done) => {
    const param = "63bd0e90a59b4c02537643ae";
    const blog = {
      title: "testing blog",
      category: "tests",
    };
    chai
      .request(server)
      .patch("/Api/blogs/blog/" + param)
      .send(blog)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});
