import { registerEnumType } from '@nestjs/graphql';

export enum TypeEnum {
  CONTROL = 'control',
  EXECUTIVE = 'executive',
}

registerEnumType(TypeEnum, {
  name: 'typeEnum',
});
