import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { retry } from 'rxjs';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { CreateMovieDTO } from './dto/create-movie.dto';

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
    getOne(@Param("id") movieId: number): Movie {
        console.log("type",typeof(movieId))
        return this.movieService.getOne(movieId);
    } 

    @Post()
    create(@Body() movieData: CreateMovieDTO) {
        return this.movieService.create(movieData) ;
    }
    @Delete("/:id")
    remove(@Param("id") movieId: number) {
        return this.movieService.deleteOne(movieId);
    }
    @Patch("/:id")
    patch(@Param('id') movieId: number, @Body() updateData) {
        return this.movieService.update(movieId,updateData);
    }
}
 