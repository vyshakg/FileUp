import request from "supertest";
import { Connection } from "typeorm";
import { testDatabaseConnection } from "../testDatabaseConnection";

const app = process.env.TEST_HOST as string;
let conn: Connection;
const user = {
  email: "jondoe@yahoo.com",
  password: "12345",
  username: "jondoe"
};
beforeAll(async done => {
  conn = await testDatabaseConnection();

  request(app)
    .post("/api/register")
    .type("form")
    .set("Accept", "application/json")
    .send(user)
    .end(() => done());
});

afterAll(async done => {
  await conn.close();
  done();
});

/*
 * @author : vyshak G
 * @Test : coorect credentials respond with 200 ok
 */

describe("Login POST", () => {
  it("coorect credentials respond with 200 ok", async done => {
    request(app)
      .post("/api/login")
      .type("form")
      .set("Accept", "application/json")
      .send({ email: user.email, password: user.password })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  /*
   * @author : vyshak G
   * @Test : coorect credentials respond with 200 ok
   */

  it("wrong password", async done => {
    request(app)
      .post("/api/login")
      .type("form")
      .set("Accept", "application/json")
      .send({ email: user.email, password: "hack" })
      .expect(res => {
        expect(res.body.message).toBe("Invalid Credientials");
        expect(res.status).toBe(401);
      })
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  it("wrong email", async done => {
    request(app)
      .post("/api/login")
      .type("form")
      .set("Accept", "application/json")
      .send({ email: "yahoo@g.com", password: user.password })
      .expect(res => {
        expect(res.body.message).toBe("Invalid Credientials");
        expect(res.status).toBe(401);
      })
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});
