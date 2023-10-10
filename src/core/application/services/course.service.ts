import { Inject, Injectable } from '@nestjs/common';
import { CourseRepository } from '../../domain/interfaces/course-repository.interface';
import { Course } from '../../domain/models/course.model';

@Injectable()
export class CourseService {
  constructor(
    @Inject('CourseRepository')
    private readonly courseRepository: CourseRepository,
  ) {}

  async findAll(): Promise<Course[]> {
    return this.courseRepository.findAll();
  }

  async findById(id: string): Promise<Course | null> {
    return this.courseRepository.findById(id);
  }

  async create(course: Course): Promise<Course> {
    return this.courseRepository.create(course);
  }

  async update(id: string, course: Course): Promise<Course> {
    return this.courseRepository.update(id, course);
  }

  async delete(id: string): Promise<void> {
    return this.courseRepository.delete(id);
  }
}
