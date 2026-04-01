import { IsEmail, IsString, MinLength, Matches } from 'class-validator';

export class CreateContactDto {
  @IsString()
  @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
  @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, { message: 'El nombre solo puede contener letras' })
  nombre: string;

  @IsEmail({}, { message: 'El email no tiene un formato válido' })
  email: string;
}