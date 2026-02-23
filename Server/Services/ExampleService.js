const exampleRepository = require('../Repositories/ExampleRepository');
const Example = require('../Models/Example');
const IdGen = require('../Utils/IdGen');

class ExampleService {
  
  async getAllExamples(queryParams) {
    const examples = await exampleRepository.getAllExamples(queryParams);
    return examples.map(examples => new Example(examples.id, examples.name));
  }

  async getExampleById(id) {
    const example = await exampleRepository.getExampleById(id);
    if (!example) {
      throw new Error('Example not found');
    }
    return new Example(example.id, example.name);
  }

  async createExample(body) {
    const created = await exampleRepository.createExample(id = IdGen.getId(), body);
    return new Example(created.id, created.name);
  }

  async editExample(id, update) {
    const original = await exampleRepository.getExampleById(id);
    if (!original) {
      throw new Error("Example not found");
    }

    const updatedExample = {
        // if update----use update-if not--use original
        // condition ----- if true ----- if false -----
      name: update.name ? update.name : original.name // This is correct, don't change it
      // Add other example props here and use ternary to update
    };

    const updated = await exampleRepository.editExample(original.id, updatedExample);
    return new Example(updated.id, updated.name);
  }

  async deleteExample(id) {
    const example = await exampleRepository.getExampleById(id);
    if (!example) {
      throw new Error("Example not found");
    }
    await exampleRepository.deleteExample(id);
    return { message: "Example deleted successfully" };
  }

}



module.exports = new ExampleService();

// the service layer acts as the heart of your 
// application by housing the business logic, 
// making it easier to manage, test, and evolve 
// the application in line with business needs.
