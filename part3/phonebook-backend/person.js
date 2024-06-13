const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
  },
  number: {
    type: String,
    minlength: 8,
    validate: {
      validator: (v) => {
        const parts = v.split("-");

        if (parts.length !== 2) {
          return false;
        }

        const [firstPart, secondPart] = parts;

        if (!(firstPart.length === 2 || firstPart.length === 3)) {
          return false;
        }

        const isNumeric = (str) => {
          return /^\d+$/.test(str);
        };

        if (!isNumeric(firstPart) || !isNumeric(secondPart)) {
          return false;
        }

        return true;
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
