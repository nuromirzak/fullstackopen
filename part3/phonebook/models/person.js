const moongoose = require("mongoose");

const nummberPartValidator = {
  validator: (number) => {
    const dashes = number.match(/-/g);
    if (dashes && dashes.length > 1) {
      return false;
    }
    const firstDash = number.indexOf("-");
    if (firstDash != 2 && firstDash != 3) {
      return false;
    }
  },
  msg: "Before the first dash, there must be 2 or 3 digits and there must be only one dash",
};

const minlengthValidator = {
  validator: (number) => {
    const digits = number.replace(/\D/g, "");
    return digits.length >= 8;
  },
  msg: "Phone number must have at least 8 digits",
};

const personSchema = new moongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
  },
  number: {
    type: String,
    required: true,
    validate: [minlengthValidator, nummberPartValidator],
  }
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = moongoose.model("Person", personSchema);
