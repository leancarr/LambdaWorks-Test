import 'dotenv/config';
import { Injectable } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../../generated/prisma/client';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });

const prisma = new PrismaClient({ adapter });

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

  async update(id: number, data: { nombre: string; email: string }) {
    return await prisma.contact.update({
      where: { id },
      data,
    });
  }
}
