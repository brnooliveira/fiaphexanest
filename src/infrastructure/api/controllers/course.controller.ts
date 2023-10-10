import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  CreateCourseDto,
  UpdateCourseDto,
} from 'src/core/application/dtos/course.dto';
import { CourseService } from 'src/core/application/services/course.service';
import { Course } from 'src/core/domain/models/course.model';

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  findAll(): Promise<Course[]> {
    return this.courseService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<Course | null> {
    return this.courseService.findById(id);
  }

  @Post()
  create(@Body() createCourseDto: CreateCourseDto): Promise<Course> {
    const course = new Course({
      name: createCourseDto.name,
      description: createCourseDto.description,
    });
    return this.courseService.create(course);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCourseDto: UpdateCourseDto,
  ): Promise<Course> {
    const course = new Course({
      name: updateCourseDto.name,
      description: updateCourseDto.description,
    });
    return this.courseService.update(id, course);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.courseService.delete(id);
  }
}
