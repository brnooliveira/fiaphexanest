import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CourseRepository } from 'src/core/domain/interfaces/course-repository.interface';
import { Course } from 'src/core/domain/models/course.model';

@Injectable()
export class PrismaCourseRepository implements CourseRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findAll(): Promise<Course[]> {
    return this.prisma.course.findMany();
  }

  async findById(id: string): Promise<Course | null> {
    return this.prisma.course.findUnique({ where: { id } });
  }

  async create(course: Course): Promise<Course> {
    return this.prisma.course.create({ data: course });
  }

  async update(id: string, course: Course): Promise<Course> {
    return this.prisma.course.update({
      where: { id: id },
      data: course,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.course.delete({ where: { id } });
  }
}
