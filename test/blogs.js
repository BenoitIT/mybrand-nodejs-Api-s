const chai = require("chai");
const expect = require("chai").expect();
const chaiHttp = require("chai-http");
const Blog = require("../APIs/models/blogs");
const server = require("../APIs/server");
const should = chai.should();
chai.use(chaiHttp);

describe("testing blogs Api", () => {
  /**
   * testing get all blogs routes
   */
  // it("it should GET all the blogs", (done) => {
  //   chai
  //     .request(server)
  //     .get("/Api/blogs/all")
  //     .end((err, res) => {
  //       res.should.have.status(200);
  //       res.body.should.be.a("object");
  //       done();
  //     });
  // });
   
  it("it should delete the blog with matching id by authorized user", (done) => {
    const param = "63bd0e90a59b4c02537643ae";
    chai
      .request(server)
      .delete("/Api/blogs/blog/" + param)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  /**
   * testing authorized update single blog routes
   */
  it("it should delete the blog with matching id by authorized user", (done) => {
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
