import { Controller, Get, Post, Delete, Put , Body, Param } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './create-contact.dto';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Get()
  findAll() {
    return this.contactsService.findAll();
  }

  @Post()
  create(@Body() data: CreateContactDto) {
    return this.contactsService.create(data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactsService.remove(Number(id));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: { nombre: string; email: string }) {
    return this.contactsService.update(Number(id), data);
}

}
