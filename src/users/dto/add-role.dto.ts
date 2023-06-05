import { IsString } from 'class-validator';

export class AddRoleDto {
  @IsString({ message: 'Value must be a string' })
  readonly value: string;
}
