import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Connection, getConnection } from 'typeorm';
import { ValidatorArgumentsInterface } from '../contracts/interfaces/validator-arguments.interface';

@ValidatorConstraint({ name: 'UniqueValidator', async: true })
@Injectable()
export abstract class UniqueValidator implements ValidatorConstraintInterface {
  protected constructor(
    protected readonly connection: Connection = getConnection('default'),
  ) {}

  public async validate<Entity>(
    value: any,
    args: ValidatorArgumentsInterface<Entity>,
  ) {
    const [EntityClass, findCondition = args.property] = args.constraints;
    return (
      (await this.connection.getRepository(EntityClass).count({
        where:
          typeof findCondition === 'function'
            ? findCondition(args)
            : {
                [findCondition || args.property]: value,
              },
      })) <= 0
    );
  }

  defaultMessage(args?: ValidationArguments): string {
    const [EntityClass] = args.constraints;
    const entity = EntityClass.name || 'Entity';
    return `${entity} with the same '${args.property}' already exist`;
  }
}
