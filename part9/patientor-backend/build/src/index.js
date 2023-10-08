"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors = require("cors");
const diagnoses_1 = __importDefault(require("./routes/diagnoses"));
const patients_1 = __importDefault(require("./routes/patients"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const options = {
    origin: ['http://localhost:5173']
};
app.use(cors(options));
const PORT = 3000;
app.get('/api/ping', (_req, res) => {
    console.log('someone pinged here');
    res.send('pong');
});
app.use('/api/diagnoses', diagnoses_1.default);
app.use('/api/patients', patients_1.default);
app.use((req, res) => {
    console.log(req.url);
    res.status(404).send({ error: 'unknown endpoint' });
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
