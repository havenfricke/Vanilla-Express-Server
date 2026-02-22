const exampleRepository = require('../Repositories/ExampleRepository');
const Example = require('../Models/Example');
const IdGen = require('../Utils/IdGen');

async function getAllExamples(queryParams) {
  const examples = await exampleRepository.getAllExamples(queryParams);
  return examples.map(examples => new Example(examples.id, examples.name));
}

async function getExampleById(id) {
  const example = await exampleRepository.getExampleById(id);
  if (!example) {
    throw new Error('Example not found');
  }
  return new Example(example.id, example.name);
}

async function createExample(body) {
  const created = await exampleRepository.createExample(id = IdGen.getId(), body);
  return new Example(created.id, created.name);
}

async function editExample(update) {
  const original = await exampleRepository.getExampleById(update.id);
  if (!original) {
    throw new Error("Example not found");
  }

  const updatedExample = {
    name: update.name === original.name ? original.name : update.name
    // Add other example props here and use ternary to update
  };

  const updated = await exampleRepository.editExample(update.id, updatedExample);
  return new Example(updated.id, updated.name);
}

async function deleteExample(id) {
  const original = await exampleRepository.getExampleById(id);
  if (!original) {
    throw new Error("Example not found");
  }
  await exampleRepository.deleteExample(id);
  return { message: "Example deleted successfully" };
}

module.exports = {
  getAllExamples,
  getExampleById,
  createExample,
  editExample,
  deleteExample
};

// the service layer acts as the heart of your 
// application by housing the business logic, 
// making it easier to manage, test, and evolve 
// the application in line with business needs.
