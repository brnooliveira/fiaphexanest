export class CreateCourseDto {
  name: string;
  description: string;
}

export class UpdateCourseDto {
  name?: string;
  description?: string;
}
