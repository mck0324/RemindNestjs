import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './../src/app.module';
import { title } from 'process';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }));
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello Nest!');
  });
  describe("/movies", () => {
    it("GET", () => {
      return request(app.getHttpServer())
        .get("/movies")
        .expect(200)
        .expect([]);
    });
    it("POST", () => {
      return request(app.getHttpServer())
        .post("/movies")
        .send({
          title: "Test",
          year: 2000,
          genres: ["Test"]
        })
        .expect(201)
    });
    it("POST 400", () => {
      return request(app.getHttpServer())
        .post("/movies")
        .send({
          title: "Test",
          year: 2000,
          genres: ["Test"],
          other:"thing"
          
        })
        .expect(400)
    });
    it("DELETE", () => {
      return request(app.getHttpServer())
        .delete("/movies")
        .expect(404)
    });

    describe("/movies/:id", () => {
      it("GET 200", () => {
        return request(app.getHttpServer())
          .get("/movies/999")
          .expect(404);
      })
      it("PATCH", () => {
        return request(app.getHttpServer())
          .patch("/movies/1")
          .send({
            title: "Updated Test"
          })
          .expect(200);
      });
        it("DELETE", () => {
          return request(app.getHttpServer())
            .delete("/movies/1")
            .expect(200);
        });
    });
  })

  
});
