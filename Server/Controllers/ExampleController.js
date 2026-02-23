const multer = require('multer')
const path = require('path')
const exampleService = require('../Services/ExampleService')
const BaseController = require('../Utils/BaseController')

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'Uploads/')
  },
  filename: (req, file, callback) => {
    const { name, ext } = path.parse(file.originalname)
    callback(null, `${name}-${Date.now()}${ext}`)
  }
})

const upload = multer({
  storage,
  fileFilter: (req, file, callback) => {
    const allowedFileMimeTypes = ['image/png', 'image/jpg', 'image/jpeg']
    callback(null, allowedFileMimeTypes.includes(file.mimetype))
  }
})

class ExampleController extends BaseController {
  constructor() {
    super('/examples')
    // Register the routes
    this.router
      .get('', upload.none(), this.getAllExamples)
      .get('/:id', upload.none(), this.getExampleById)
      .post('', upload.none(), this.createExample)
      .put(':/id', upload.none(), this.editExample)
      .delete('/:id', upload.none(), this.deleteExample)
  }

  async getAllExamples(req, res, next) {
    try {
      const examples = await exampleService.getAllExamples(req.query) // if using auth send creator id up to compare (for access control)
      res.json({ data: examples })
    } catch (error) {
      next(error)
    }
  }

  async getExampleById(req, res, next) {
    try {
      const example = await exampleService.getExampleById(req.params.id) // if using auth send creator id up to compare (for access control)
      res.json({ data: example })
    } catch (error) {
      next(error)
    }
  }

  async createExample(req, res, next) {
    try {
      const newExample = await exampleService.createExample(req.body)
      res.status(201).json({ data: newExample })
    } catch (error) {
      next(error)
    }
  }

  async editExample(req, res, next){
    try {
      const example = await exampleService.editExample(req.params.id, req.body); // send id and body, if using auth send creator id up to compare
      res.json({ data: example })
    } catch (error){
      next(error);
    }
  }

  async deleteExample(req, res, next) {
    try {
      const example = await exampleService.deleteExample(req.params.id); // if using auth send creator id up to compare
      res.json({ data: example });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ExampleController

// In Express, the incoming request data is 
// separated into different objects based on 
// where the data comes from:

// req.params:
// This object contains route parameters—parts 
// of the URL that are defined in your route path. 
// For example, if you define a route as /examples/:id, 
// the value of :id is accessible via req.params.id.

// req.body:
// This object contains data that is sent in the 
// body of the request (commonly in POST or PUT requests). 
// This data is usually parsed from JSON or form data.

// We don't use something like body.params because 
// Express separates these concerns into different 
// properties (req.params for URL parameters and req.body 
// for request payload). This design helps to clarify 
// the source of the data in your request.