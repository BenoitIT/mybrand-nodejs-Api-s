const chai= require("chai");
const chaiHttp =require("chai-http");
const server =require("../APIs/server");
chai.should();
chai.use(chaiHttp);
describe("testing blogs Api",()=>{
    /**
     * testing get all blogs routes
     */
// describe("Get/Api/blogs/all",()=>{
//     it('it should GET all the blogs', (done) => {
//         chai
//           .request(server)
//           .get('/Api/blogs/all')
//           .end((err, res) => {
//             res.should.have.status(200);
//             res.body.should.be.a('object');
//             done();
//           });
//         })
//         })

// });
// describe("testing single blog Api",()=>{
//     /**
//      * testing get single blog routes
//      */

// describe("Get/Api/blogs/blog",()=>{
//     it('it should GET single  the blogs', (done) => {
//         const param='63be4a0ab8edfccc64505bd2'
//         chai
//           .request(server)
//           .get('/Api/blogs/blog/'+param)
//           .end((err, res) => {
//             res.should.have.status(200);
//             res.body.should.be.a('object');
//             done();
//           });
//         })
//         })
//         })
    describe("testing delete a blog Api",()=>{
     /**
     * testing delete single blog routes
     */
    describe("delete/Api/blogs/blog",()=>{
        it('it should delete the blog with matching id by authorized user',(done)=>{
            const param='63bd0e90a59b4c02537643ae'
            chai
            .request(server)
            .delete('/Api/blogs/blog/'+param)
            .end((err, res) => {
              res.should.have.status(400);
              done();
            });
        })
    })
    })
    describe("testing delete a blog Api",()=>{
        /**
        * testing authorized update single blog routes
        */
       describe("delete/Api/blogs/blog",()=>{
           it('it should delete the blog with matching id by authorized user',(done)=>{
               const param='63bd0e90a59b4c02537643ae'
               const blog={
                title:'testing blog',
                category:'tests'
               }
               chai
               .request(server)
               .patch('/Api/blogs/blog/'+param)
               .send(blog)
               .end((err, res) => {
                 res.should.have.status(400);
                 done();
               });
           })
       })
       })
        

    })
