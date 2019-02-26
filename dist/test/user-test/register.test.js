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
const faker_1 = __importDefault(require("faker"));
const supertest_1 = __importDefault(require("supertest"));
const User_1 = require("../../entity/User");
const index_1 = require("../../index");
const testDatabaseConnection_1 = require("../testDatabaseConnection");
let conn;
beforeAll((done) => __awaiter(this, void 0, void 0, function* () {
    conn = yield testDatabaseConnection_1.testDatabaseConnection();
    done();
}));
afterAll((done) => __awaiter(this, void 0, void 0, function* () {
    yield conn.close();
    done();
}));
describe("Register POST", () => {
    it("Respond with 200 created.", (done) => __awaiter(this, void 0, void 0, function* () {
        const user = {
            email: faker_1.default.internet.email(),
            password: faker_1.default.internet.password(),
            username: faker_1.default.name.findName()
        };
        supertest_1.default(index_1.app)
            .post("/api/register")
            .type("form")
            .set("Accept", "application/json")
            .send(user)
            .expect(200)
            .end(() => done());
    }));
    it("Register with proper Inputs.", (done) => __awaiter(this, void 0, void 0, function* () {
        const user = {
            email: faker_1.default.internet.email(),
            password: faker_1.default.internet.password(),
            username: faker_1.default.name.findName()
        };
        supertest_1.default(index_1.app)
            .post("/api/register")
            .type("form")
            .set("Accept", "application/json")
            .send(user)
            .expect(res => {
            expect(res.body.email).toBe(user.email);
            expect(res.body.ok).toBeTruthy();
            expect(res.body.username).toBe(user.username);
        })
            .end((err, res) => {
            if (err)
                return done(err);
            done();
        });
    }));
    it("Database insertion check for the register endpoint.", (done) => __awaiter(this, void 0, void 0, function* () {
        const user = {
            email: "jondoe@gmail.com",
            password: faker_1.default.internet.password(),
            username: faker_1.default.name.findName()
        };
        let response;
        supertest_1.default(index_1.app)
            .post("/api/register")
            .type("form")
            .set("Accept", "application/json")
            .send(user)
            .then(res => {
            response = res.body;
            User_1.User.findOne({ email: response.email }).then(dbUser => {
                expect(dbUser).toBeDefined();
                expect(dbUser.password).not.toBe(user.password);
                expect(dbUser.username).toBe(response.username);
                expect(dbUser.email).toBe(response.email);
                done();
            });
        });
    }));
    it("Wrong Email : abc.com", (done) => __awaiter(this, void 0, void 0, function* () {
        const user = {
            email: "abc.com",
            password: faker_1.default.internet.password(),
            username: faker_1.default.name.findName()
        };
        supertest_1.default(index_1.app)
            .post("/api/register")
            .type("form")
            .set("Accept", "application/json")
            .send(user)
            .expect(res => {
            expect(res.body[0].path).toBe("email");
        })
            .end((err, res) => {
            if (err)
                return done(err);
            done();
        });
    }));
    it("Wrong Email : abcgmail", (done) => __awaiter(this, void 0, void 0, function* () {
        const user = {
            email: "abcgmail",
            password: faker_1.default.internet.password(),
            username: faker_1.default.name.findName()
        };
        supertest_1.default(index_1.app)
            .post("/api/register")
            .type("form")
            .set("Accept", "application/json")
            .send(user)
            .expect(res => {
            expect(res.body[0].path).toBe("email");
        })
            .end((err, res) => {
            if (err)
                return done(err);
            done();
        });
    }));
    it("Wrong Username : ofLength(30+) ", (done) => __awaiter(this, void 0, void 0, function* () {
        const user = {
            email: faker_1.default.internet.email(),
            password: faker_1.default.internet.password(),
            username: "abcdefghijklmnopqrstuvwxyz2123444"
        };
        supertest_1.default(index_1.app)
            .post("/api/register")
            .type("form")
            .set("Accept", "application/json")
            .send(user)
            .expect(res => {
            expect(res.body[0].path).toBe("username");
        })
            .end((err, res) => {
            if (err)
                return done(err);
            done();
        });
    }));
    it("Wrong password : empty string", (done) => __awaiter(this, void 0, void 0, function* () {
        const user = {
            email: faker_1.default.internet.email(),
            password: "",
            username: faker_1.default.name.findName()
        };
        supertest_1.default(index_1.app)
            .post("/api/register")
            .type("form")
            .set("Accept", "application/json")
            .send(user)
            .expect(401)
            .end((err, res) => {
            if (err)
                return done(err);
            done();
        });
    }));
    it("Register with Same Email.", (done) => __awaiter(this, void 0, void 0, function* () {
        const user = {
            email: "jondoe@gmail.com",
            password: faker_1.default.internet.password(),
            username: faker_1.default.name.findName()
        };
        supertest_1.default(index_1.app)
            .post("/api/register")
            .type("form")
            .set("Accept", "application/json")
            .send(user)
            .expect(401)
            .end((err, res) => {
            if (err)
                return done(err);
            done();
        });
    }));
});
//# sourceMappingURL=register.test.js.map