import faker from "faker";
import request from "supertest";
import { Connection } from "typeorm";
import { User } from "../../entity/User";
import { app } from "../../index";
import { testConnection } from "../../test/testDatabaseConnection";
let conn: Connection;

beforeAll(async () => {
  conn = await testConnection();
});
afterAll(async () => {
  await conn.close();
});

describe("Register POST", () => {
  it("Respond with 200 created.", done => {
    const user = {
      email: faker.internet.email(),
      password: faker.internet.password(),
      username: faker.name.findName()
    };
    request(app)
      .post("/api/register")
      .type("form")
      .set("Accept", "application/json")
      .send(user)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
  it("Ckecking the response data.", done => {
    const user = {
      email: faker.internet.email(),
      password: faker.internet.password(),
      username: faker.name.findName()
    };
    request(app)
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
        if (err) return done(err);
        done();
      });
  });
  it("Ckecking DataBase.", done => {
    const user = {
      email: faker.internet.email(),
      password: faker.internet.password(),
      username: faker.name.findName()
    };
    let response: any;
    request(app)
      .post("/api/register")
      .type("form")
      .set("Accept", "application/json")
      .send(user)
      .then(res => {
        response = res.body;
        User.findOne({ email: response.email }).then(dbUser => {
          expect(dbUser).toBeDefined();
          expect(dbUser!.password).not.toBe(user.password);
          expect(dbUser!.username).toBe(response.username);
          expect(dbUser!.email).toBe(response.email);
          done();
        });
      });
  });
  it("Wrong Email [1]", done => {
    const user = {
      email: "abc.com",
      password: faker.internet.password(),
      username: faker.name.findName()
    };
    request(app)
      .post("/api/register")
      .type("form")
      .set("Accept", "application/json")
      .send(user)
      .expect(res => {
        expect(res.body[0].path).toBe("email");
      })
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
  it("Wrong Email [2]", done => {
    const user = {
      email: "abcgmail",
      password: faker.internet.password(),
      username: faker.name.findName()
    };
    request(app)
      .post("/api/register")
      .type("form")
      .set("Accept", "application/json")
      .send(user)
      .expect(res => {
        expect(res.body[0].path).toBe("email");
      })
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
  it("Wrong Username", done => {
    const user = {
      email: faker.internet.email(),
      password: faker.internet.password(),
      username: "abcdefghijklmnopqrstuvwxyz2123444"
    };
    request(app)
      .post("/api/register")
      .type("form")
      .set("Accept", "application/json")
      .send(user)
      .expect(res => {
        expect(res.body[0].path).toBe("username");
      })
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
  it("Expected Status Code 401", done => {
    const user = {
      email: faker.internet.email(),
      password: "",
      username: faker.name.findName()
    };
    request(app)
      .post("/api/register")
      .type("form")
      .set("Accept", "application/json")
      .send(user)
      .expect(401)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});
