import { ValidationArguments } from 'class-validator';
import { EntitySchema, FindConditions, ObjectType } from 'typeorm';

export interface ValidatorArgumentsInterface<Entity>
  extends ValidationArguments {
  constraints: [
    ObjectType<Entity> | EntitySchema<Entity> | string,
    (
      | ((validationArguments: ValidationArguments) => FindConditions<Entity>)
      | keyof Entity
    ),
  ];
}
