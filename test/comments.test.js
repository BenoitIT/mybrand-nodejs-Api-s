const chai = require("chai");
const expect = require("chai").expect();
const chaiHttp = require("chai-http");
import server from "./server.test";
const should = chai.should();
chai.use(chaiHttp);
let id;
describe('should get blog id',async()=>{
  const blog= await chai.request(server).get('/Api/blogs/all');
    const texts=blog.text;
    const decordedData=JSON.parse(texts)
     id=decordedData.data[0]._id;
})

describe("testing comments", () => {
  /**
   * testing get all blogs routes
   */
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
  it("it should  not  get specific get blog to add blog", (done) => {
    chai
      .request(server)
      .post(`/Api/blog/${id}/addcomment`)
      .set('Authorization',`Bearer ${token}`)
      .end((err, res) => {
        res.should.have.status(204);
        done();
      });
  });
  it("it should  not  delete specific comment", (done) => {
    const param = "63bd0e90a59b4c02537643ae";
    chai
      .request(server)
      .delete("/Api/blog/comments/delete/" +param)
      .set('Authorization',`Bearer ${token}`)
      .end((err, res) => {
        res.should.have.status(500);
        done();
      });
  });
})
