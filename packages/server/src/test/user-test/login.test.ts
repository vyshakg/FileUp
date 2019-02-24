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
 * @Test : Check for Respond with 200 ok
 */

describe("Login POST", () => {
  it("Respond with 200 created.", async done => {
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
});
