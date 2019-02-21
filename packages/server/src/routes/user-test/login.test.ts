import request from "supertest";
import { Connection } from "typeorm";
import { app } from "../../index";
import { testConnection } from "../../test/testDatabaseConnection";

let conn: Connection;

const user = {
  email: "jondoe@yahoo.com",
  username: "jonDoe",
  password: "JonDoe123"
};

beforeAll(async () => {
  conn = await testConnection(true);
  request(app)
    .post("/api/register")
    .type("form")
    .set("Accept", "application/json")
    .send(user)
    .end();
});
afterAll(async () => {
  await conn.close();
});

describe("Login POST", () => {
  const loginData = {
    email: user.email,
    password: user.password
  };
  it("Respond with 200 ok.", done => {
    request(app)
      .post("/api/login")
      .type("form")
      .set("Accept", "application/json")
      .send(loginData)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});
