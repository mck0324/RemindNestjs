import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe("getAll", () => {
    it("shold return an array", () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe("getOne", () => {
    it("should return a movie", () => {
      service.create({
        title: "Test Movie",
        genres: ["test"],
        year: 2020,
      });
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
      expect(movie.title).toEqual("Test Movie");
    });
    it("should throw 404 error", () => {
      try {
        service.getOne(999);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(`Movie with ID 999 not found.`);
      }
    });
  });
  describe("deleteOne", () => {
    it("deletes a movie", () => {
      service.create({
        title: "Test Movie",
        genres: ["Test"],
        year: 2000,
      });
      const allMovies = service.getAll().length;
      service.deleteOne(1);
      const afterDelete = service.getAll().length;
      expect(afterDelete).toBeLessThan(allMovies);
    });
    it("shuold return a 404", () => {
      try {
        service.deleteOne(2222);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe("create", () => {
    it("create a moive ", () => {
      const beforeCreate = service.getAll().length;
      service.create({
        title: "Test",
        genres: ["Test"],
        year: 2020
      });
      const afterCreate = service.getAll().length;
      console.log(beforeCreate,afterCreate);
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe("update", () => {
    it("should update a move", () => {
      service.create({
        title: "Test",
        genres: ["Test"],
        year: 2020
      });
      service.update(1,{title:'Update Test'});
      const movie = service.getOne(1);
      expect(movie.title).toEqual('Update Test');
    });
    it("shuold throw a NotFoundException", () => {
      try {
        service.update(2222, {});
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
