import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
  Type,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { Types } from 'mongoose';

export class ValidationPipe implements PipeTransform {
  async transform(value: unknown, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }
    return value;
  }

  private toValidate(metatype: Type<any>): boolean {
    const primitiveTypes = [String, Boolean, Number, Array, Object];
    return !primitiveTypes.includes(metatype as any);
  }
}

export class ParseObjectIdPipe implements PipeTransform<string, string> {
  transform(value: string) {
    const isValid = Types.ObjectId.isValid(value);
    if (!isValid) {
      throw new BadRequestException('Invalid ObjectId');
    }
    return value;
  }
}
