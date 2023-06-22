"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const api_1 = __importDefault(require("./routes/api"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const port = process.env.PORT || "8080";
const server = (0, express_1.default)();
server.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json");
    next();
});
server.use((0, cors_1.default)()); // <---- use cors middleware
server.use(express_1.default.static(path_1.default.join(__dirname, "../public")));
server.use(express_1.default.urlencoded({ extended: true }));
// Definindo que o server irá utilizar JSON para se comunicar.
server.use(express_1.default.json());
//usando as rotas
server.use(api_1.default);
// Caso a api retorne algum erro, retornar erro.
server.use((err, req, res, next) => {
    if (err) {
        return res.status(400).json({
            message: err.message,
        });
    }
    return res.status(500).json({
        message: "Erro interno do server.",
    });
});
// Caso a rota não exista, retornar erro.
server.use((req, res) => {
    res.status(404);
    res.json({ error: "Endpoint não encontrado." });
});
// função que retorna erro caso tenha algum problema com o servidor.
const errorHandler = (err, req, res, next) => {
    res.status(400); // Bad Request
    console.log(err);
    res.json({ error: "Ocorreu algum erro." });
};
server.use(errorHandler);
// Declarando a porta que o server irá ler.
server.listen(port);
//# sourceMappingURL=server.js.map