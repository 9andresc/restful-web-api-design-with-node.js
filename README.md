# RESTful Web API Design with Node.js
My coding practices from the book: [RESTful Web API Design with Node.js - Second Edition](https://www.packtpub.com/web-development/restful-web-api-design-nodejs-second-edition)

## Chapter 1: What You Did Not Know
Key principles around the HTTP and URI standards:

- Everything is a resource
- Each resource is identifiable by an unique identifier (URI)
- Use the standard HTTP methods
- Resources can have multiple representations
- Communicate in a stateless way

The REST goals are:

- Separation of the representation and the resource
- Visibility
- Reliability
- Scalability
- Performance

## Chapter 2: Getting Started with Node.js
Steps to get started:

- Initialize `package.json` file with `npm init` command
- Install Express and other modules through NPM
- Setting up a development environment

Playing around with basic Node.js:

- Handling HTTP requests
- Modularizing code
- Testing Node.js
- Working with mock objects

## Chapter 3: Building a Typical Web API
To sum up, I will learn the following:

- How to specify a Web API
- How to implement routes
- How to query the API
- How content negotiation works
- What is CORS
- API versioning

## Chapter 4: Using NoSQL Databases
NoSQL databases are used heavily in cloud environments. They have the 
following advantages over traditional SQL databases:

- They are schemaless, that is, they work with object representations 
rather than store the object state in one or several tables, depending 
on their complexity.
- They are extendable, because they store an actual object. Data 
evolution is supported implicitly, so all you need to do is just call 
the operation that stores the object.
- They are designed to be highly distributed and scalable.

These are the NoSQL databases to review & use:

- LevelDB
- MongoDB

#### LevelDB
It is an open-source implementation developed by Google and written in 
C++. It is supported by a wide range of platforms, including Node.js. 
LevelDB is a key/value store; both the key and value are represented as 
binary data, so their content can vary from simple strings to binary 
representations of serialized objects in any format, such as JSON or 
XML.
What makes LevelDB perform better than an arbitrary file storage 
implementation is it uses a "log-structured merge" topology, which 
stores all write operations in an in-memory log, transferred (flushed) 
regularly to a permanent storage called Sorted String (SST) files. Read 
operations first attempt to retrieve entries from a cache containing 
the most commonly returned results. The size of the reading cache and 
the flush interval of the writing log are configurable parameters, 
which can be further adjusted in order to be adequate for the 
application load.