import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import { isValid } from 'date-fns';

export const IsCustomDate = (
  validationOptions?: ValidationOptions,
) => (object: Object, propertyName: string) => {
  registerDecorator({
    name: 'IsCustomDate',
    target: object.constructor,
    propertyName,
    options: validationOptions,
    validator: {
      validate(value: any, args: ValidationArguments) {
        return typeof value === 'string'
          && isValid(new Date(value));
      },
    },
  });
};
