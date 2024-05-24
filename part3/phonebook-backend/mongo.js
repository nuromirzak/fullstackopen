"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
console.log(process.argv);
if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>');
    process.exit(1);
}
const password = process.argv[2];
const url = `mongodb+srv://nuromirzaq:${password}@cluster0.2ai7e2u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
mongoose_1.default.set("strictQuery", true);
mongoose_1.default.connect(url)
    .then((response) => {
    console.log('connected to MongoDB');
});
const personSchema = new mongoose_1.default.Schema({
    name: String,
    number: String,
});
const Person = mongoose_1.default.model('Person', personSchema);
if (process.argv.length === 3) {
    console.log('Phonebook:');
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person.name, person.number);
        });
        mongoose_1.default.connection.close();
    });
}
else if (process.argv.length === 5) {
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
    });
    person.save().then(() => {
        console.log(`added ${person.name} number ${person.number} to phonebook`);
        mongoose_1.default.connection.close();
    });
}
