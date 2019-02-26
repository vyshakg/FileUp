"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = require("../../index");
const testDatabaseConnection_1 = require("../testDatabaseConnection");
let conn;
const user = {
    email: "jondoe@yahoo.com",
    password: "12345",
    username: "jondoe"
};
beforeAll((done) => __awaiter(this, void 0, void 0, function* () {
    conn = yield testDatabaseConnection_1.testDatabaseConnection();
    supertest_1.default(index_1.app)
        .post("/api/register")
        .type("form")
        .set("Accept", "application/json")
        .send(user)
        .end(() => done());
}));
afterAll((done) => __awaiter(this, void 0, void 0, function* () {
    yield conn.close();
    done();
}));
describe("Login POST", () => {
    it("coorect credentials respond with 200 ok", (done) => __awaiter(this, void 0, void 0, function* () {
        supertest_1.default(index_1.app)
            .post("/api/login")
            .type("form")
            .set("Accept", "application/json")
            .send({ email: user.email, password: user.password })
            .expect(200)
            .end((err, res) => {
            if (err)
                return done(err);
            done();
        });
    }));
    it("wrong password", (done) => __awaiter(this, void 0, void 0, function* () {
        supertest_1.default(index_1.app)
            .post("/api/login")
            .type("form")
            .set("Accept", "application/json")
            .send({ email: user.email, password: "hack" })
            .expect(res => {
            expect(res.body.message).toBe("Invalid Credientials");
            expect(res.status).toBe(401);
        })
            .end((err, res) => {
            if (err)
                return done(err);
            done();
        });
    }));
    it("wrong email", (done) => __awaiter(this, void 0, void 0, function* () {
        supertest_1.default(index_1.app)
            .post("/api/login")
            .type("form")
            .set("Accept", "application/json")
            .send({ email: "yahoo@g.com", password: user.password })
            .expect(res => {
            expect(res.body.message).toBe("Invalid Credientials");
            expect(res.status).toBe(401);
        })
            .end((err, res) => {
            if (err)
                return done(err);
            done();
        });
    }));
    it("Auth check", (done) => __awaiter(this, void 0, void 0, function* () {
        supertest_1.default(index_1.app)
            .get("/api/isauth")
            .expect(401)
            .end((err, res) => {
            if (err)
                return done(err);
            done();
        });
    }));
});
//# sourceMappingURL=login.test.js.map