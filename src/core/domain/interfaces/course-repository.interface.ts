import { Course } from '../models/course.model';

export interface CourseRepository {
  findAll(): Promise<Course[]>;
  findById(id: string): Promise<Course | null>;
  create(course: Course): Promise<Course>;
  update(id: string, course: Course): Promise<Course>;
  delete(id: string): Promise<void>;
}
