"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.docrouter = void 0;
const {
  Router
} = require('express');
const {
  serve,
  setup
} = require('swagger-ui-express');
const docrouter = Router();
exports.docrouter = docrouter;
const options = {
  openapi: '3.0.1',
  info: {
    title: 'My Brand',
    version: '1.0.0',
    description: 'this the list of BenDev brand API documentation created in node js.'
  },
  host: 'http://localhost:8080',
  security: [{
    bearerAuth: []
  }],
  tags: [{
    name: 'Users',
    description: 'Users'
  }, {
    name: 'Blog',
    description: 'Blogs'
  }, {
    name: 'Message',
    description: 'Messages'
  }],
  paths: {
    '/Api/admin/register': {
      post: {
        tags: ['Users'],
        description: 'User registeration',
        security: [],
        parameters: [],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User'
              },
              example: {
                username: 'John Doe',
                email: 'admin@gmail.com',
                password: '123456'
              }
            }
          },
          required: true
        },
        responses: {
          201: {
            description: 'New User was created successfully'
          },
          400: {
            description: 'Bad Request'
          },
          500: {
            description: 'Internal Server Error'
          }
        }
      }
    },
    '/Api/admin/login': {
      post: {
        tags: ['Users'],
        description: 'User login',
        security: [],
        parameters: [],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User'
              },
              example: {
                email: "benod35@gmail.com",
                password: "bed12345"
              }
            }
          },
          required: true
        },
        responses: {
          200: {
            description: 'logged in successfully'
          },
          400: {
            description: 'Invalid credation'
          },
          500: {
            description: 'Internal Server Error'
          }
        }
      }
    },
    '/Api/blogs/all': {
      get: {
        tags: ['Blog'],
        description: 'Get All Blog Articles',
        parameters: [],
        security: [],
        responses: {
          200: {
            description: 'successfully'
          },
          500: {
            description: 'Internal Server Error'
          }
        }
      }
    },
    '/Api/blogs/blog/{id}': {
      get: {
        security: [],
        tags: ['Blog'],
        description: 'Get single blog by id',
        parameters: [{
          "in": "path",
          "name": "id",
          required: true
        }],
        responses: {
          200: {
            description: 'successfully'
          },
          500: {
            description: 'Internal Server Error'
          }
        }
      }
    },
    '/Api/blogs/new': {
      post: {
        tags: ['Blog'],
        description: 'Create new blog',
        // parameters:[
        // {
        // "in":"formData",
        // "name":"title",
        // "description":"Article title",
        // required:true,
        // required:true
        // },
        // ],
        requestBody: {
          content: {
            'multipart/form-data': {
              schema: {
                $ref: '#/components/schemas/Blog'
              }
            }
          },
          required: true
        },
        responses: {
          200: {
            description: 'successfully'
          },
          401: {
            description: 'User Not Authorized'
          },
          500: {
            description: 'Internal Server Error'
          }
        }
      }
    },
    '/Api/blog/{id}': {
      patch: {
        tags: ['Blog'],
        description: 'Update blog',
        parameters: [{
          "in": "path",
          "name": "id",
          required: true
        }],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Blog'
              },
              example: {
                topic: 'this topic of blog',
                title: 'testing blog article title update',
                content: 'testing blog article content update'
              }
            }
          },
          required: true
        },
        responses: {
          200: {
            description: 'successfully'
          },
          401: {
            description: 'User Not Authorized'
          },
          404: {
            description: 'Article doesn\'t exist!'
          },
          500: {
            description: 'Internal Server Error'
          }
        }
      }
    },
    '/Api/blog/{id}': {
      delete: {
        tags: ['Blog'],
        description: 'Delete blog article',
        parameters: [{
          "in": "path",
          "name": "id",
          required: true
        }],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Blog'
              }
            }
          },
          required: true
        },
        responses: {
          200: {
            description: 'successfully'
          },
          401: {
            description: 'User Not Authorized'
          },
          404: {
            description: 'Article doesn\'t exist!'
          },
          500: {
            description: 'Internal Server Error'
          }
        }
      }
    },
    '/Api/blog/{id}/addcomment/': {
      post: {
        tags: ['Blog'],
        description: 'Comment on blog article',
        parameters: [{
          "in": "path",
          "name": "id",
          required: true
        }],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Blog'
              },
              example: {
                comment: "that content is very helpful thanks"
              }
            }
          },
          required: true
        },
        responses: {
          200: {
            description: 'successfully'
          },
          401: {
            description: 'Not Authorized'
          },
          404: {
            description: 'Article doesn\'t exist!'
          },
          500: {
            description: 'Internal Server Error'
          }
        }
      }
    },
    '/Api/messages/new': {
      post: {
        tags: ['Message'],
        security: [],
        description: 'Sending message',
        parameters: [],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Message'
              },
              example: {
                senderName: "John Doe",
                senderEmail: "john@gmail.com",
                messages: "testing message"
              }
            }
          },
          required: true
        },
        responses: {
          200: {
            description: 'successfully'
          },
          500: {
            description: 'Internal Server Error'
          }
        }
      }
    },
    '/Api/messages/all': {
      get: {
        tags: ['Message'],
        description: 'Getting all messages',
        parameters: [],
        responses: {
          200: {
            description: 'successfully'
          },
          401: {
            description: 'Not Authorized'
          },
          500: {
            description: 'Internal Server Error'
          }
        }
      }
    },
    '/Api/messages/message/{id}': {
      get: {
        tags: ['Message'],
        description: 'Get single blog by id',
        parameters: [{
          "in": "path",
          "name": "id",
          required: true
        }],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Blog'
              },
              example: {
                senderName: 'sender name',
                senderEmail: 'benoit@gmail.com',
                message: 'check it'
              }
            }
          },
          required: true
        },
        responses: {
          200: {
            description: 'successfully'
          },
          500: {
            description: 'Internal Server Error'
          }
        }
      }
    },
    '/Api/messages/message/delete/{id}': {
      delete: {
        tags: ['Message'],
        description: 'delete single blog by id',
        parameters: [{
          "in": "path",
          "name": "id",
          required: true
        }],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Message'
              }
            }
          },
          required: true
        },
        responses: {
          200: {
            description: 'successfully'
          },
          500: {
            description: 'Internal Server Error'
          }
        }
      }
    }
  },
  components: {
    schemas: {
      User: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'The auto-generated id of the user'
          },
          username: {
            type: 'string',
            description: "User's names"
          },
          password: {
            type: 'string',
            description: "User's password"
          },
          email: {
            type: 'string',
            description: "User's email"
          },
          role: {
            type: 'string',
            description: "User role"
          }
        }
      },
      Blog: {
        type: 'object',
        properties: {
          title: {
            type: 'string',
            description: "blog title"
          },
          category: {
            type: 'string',
            description: "blog category"
          },
          blogDescription: {
            type: 'string',
            description: "blog contents"
          },
          blogImage: {
            type: 'string',
            description: "image url",
            format: 'binary'
          }
        }
      },
      Message: {
        type: "object",
        properties: {
          id: {
            type: 'string',
            description: 'The auto-generated id of the message'
          },
          senderName: {
            type: 'string',
            description: 'sender name'
          },
          senderEmail: {
            type: 'string',
            description: 'sender email'
          },
          messages: {
            type: 'string',
            description: 'message content'
          }
        }
      }
    },
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  }
};
docrouter.use('/documentation', serve, setup(options));

// module.exports = docrouter;