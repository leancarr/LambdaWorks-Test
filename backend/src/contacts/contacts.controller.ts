import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { ContactsService } from './contacts.service';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Get()
  findAll() {
    return this.contactsService.findAll();
  }

  @Post()
  create(@Body() data: { nombre: string; email: string }) {
    return this.contactsService.create(data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactsService.remove(Number(id));
  }
}
