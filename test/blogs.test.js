const chai = require("chai");
const fs =require('fs');
const chaiHttp = require("chai-http");
const Blog = require("../src/models/blogs");
const path = require('path')
import server from "./server.test";
chai.should();
chai.use(chaiHttp);
/**
 * create a new blog test
 */
let token;
let _id;
describe("POST a new blog", () => {
  
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
  beforeEach(async () => {
    try {
      await Blog.deleteMany({});
    } catch (error) {}
  });
  
  it("should create the new blog", async () => {
    const blogData = {
      title: "test1223",
      category: "testtu",
      blogDescription: "description contents hhdt",
      blogImage: "image.jpg"
    };

    const res = await chai
      .request(server)
      .post("/Api/blogs/new")
      .set('Authorization',`Bearer ${token}`)
      .attach('blogImage', fs.readFileSync(path.join(__dirname, 'image.png')), 'image.png')  
      .field("title", blogData.title)
      .field("category", blogData.category)
      .field("blogDescription", blogData.blogDescription)

    res.should.have.status(201);
    res.body.should.have.property("message");
    res.body.should.have.property("data");
     _id=res.body.data._id;
    });
  });
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
    // it("it should GET single blog",async() => {
    // await chai.request(server)
    //           .get(`/Api/blogs/blog/${_id}`)
    //           .end((err,res)=>{
    //             res.should.have.status(200)
    //           })
    // });
    it("it should  not get single blog single blog", (done) => {
      const id= "63bd0e90a59b4c02537643ae";
      chai
      .request(server)
      .get(`/Api/blogs/blog/${id}`)
      .set('Authorization',`Bearer ${token}`)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('message');
        done();
      });
    });
    
    it("it should not find the blog to delete with matching id by authorized user", (done) => {
      // const id= "63bd0e90a59b4c02537643ae";
      chai
      .request(server)
      .delete(`/Api/blog/${_id}`)
      .set('Authorization',`Bearer ${token}`)
      .end((err, res) => {
        console.log(_id);
        res.should.have.status(204);
        done();
      });
  });
  it("it should  not delete single blog single blog", (done) => {
    const id= "63bd0e90a59b4c02537643ae";
    chai
      .request(server)
      .delete("/Api/blogs/"+ id)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('message');
        done();
      });
  });
  /**
   * testing authorized update single blog routes
   */
  it("it should not update the blog with matching id by authorized user", (done) => {
    const id= "63bd0e90a59b4c02537643ae";
    const blog = {
      title: "testing blog",
      category: "tests",
    };
    chai
      .request(server)
      .patch(`/Api/blog/${id}`)
      .set('Authorization',`Bearer ${token}`)
      .send(blog)
      .end((err, res) => {
        res.should.have.status(500);
        done();
      });
  });
});
