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

/*
 * @author : vyshak G
 * @Test : Check for Respond with 200 ok
 */

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

  /*
   * @author : vyshak G
   * @Test : Register with proper Inputs.
   */

  it("Register with proper Inputs.", done => {
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

  /*
   * @author : vyshak G
   * @Test : Database insertion check for the register endpoint.
   */

  it("Database insertion check for the register endpoint.", done => {
    const user = {
      email: "jondoe@gmail.com",
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

  /*
   * @author : vyshak G
   * @Test : Register with wrong email.
   */

  it("Wrong Email : abc.com", done => {
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

  it("Wrong Email : abcgmail", done => {
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

  /*
   * @author : vyshak G
   * @Test : Register with wrong username.
   */

  it("Wrong Username : ofLength(30+) ", done => {
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

  /*
   * @author : vyshak G
   * @Test : Register with wrong password.
   */

  it("Wrong password : empty string", done => {
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

  /*
   * @author : vyshak G
   * @Test : Register with Same Email.
   */
  it("Register with Same Email.", done => {
    const user = {
      email: "jondoe@gmail.com",
      password: faker.internet.password(),
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
