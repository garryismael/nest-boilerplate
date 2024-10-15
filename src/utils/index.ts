import { BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import * as mongoose from 'mongoose';

export const exceptionFactory = (validationErrors: ValidationError[] = []) => {
  return new BadRequestException(
    validationErrors.map((error) => ({
      [error.property]: Object.values(error.constraints).join(', '),
    })),
  );
};

export const SafeMongoIdTransform = ({ value }: { value: string }) => {
  try {
    if (
      mongoose.Types.ObjectId.isValid(value) &&
      new mongoose.Types.ObjectId(value).toString() === value
    ) {
      return value;
    }
    throw new BadRequestException('Id validation fail');
  } catch {
    throw new BadRequestException('Id validation fail');
  }
};
