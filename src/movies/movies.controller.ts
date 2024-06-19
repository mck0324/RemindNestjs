import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { retry } from 'rxjs';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {

    constructor(private readonly movieService: MoviesService) {}

    @Get()
    getAll(){
        return this.movieService.getAll();
    }
    @Get('search')
    search(@Query('year') searchingYear: string) {
        return `We are searching for a movie made after: ${searchingYear}`
    }

    @Get("/:id")
    getOne(@Param("id") id: string) {
        return this.movieService.getOne(id);
    } 

    @Post()
    create(@Body() movieData) {
        return movieData ;
    }
    @Delete("/:id")
    remove(@Param("id") movieId: string) {
        return `This will delete a movie with the id: ${movieId}`;
    }
    @Patch("/:id")
    patch(@Param('id') movieId: string) {
        return `This will patch a movie with the id: ${movieId}`;
    }
}
 