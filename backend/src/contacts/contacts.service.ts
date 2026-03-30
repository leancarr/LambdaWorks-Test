import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class ContactsService {
  async findAll() {
    return await prisma.contact.findMany();
  }

  async create(data: { nombre: string; email: string }) {
    return await prisma.contact.create({ data });
  }

  async remove(id: number) {
    return await prisma.contact.delete({ where: { id } });
  }
}
