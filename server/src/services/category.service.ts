import prisma from '@/configs/db.config';

export class CategoryService {
  static async create(data: {
    name: string;
    description?: string;
    agencyId: number;
  }) {
    return await prisma.category.create({
      data: {
        name: data.name,
        description: data.description,
        agencyId: data.agencyId,
      },
    });
  }

  static async getAll(agencyId?: number) {
    return await prisma.category.findMany({
      where: agencyId ? { agencyId } : {},
      orderBy: { createdAt: 'desc' },
    });
  }

  static async getById(id: number) {
    const category = await prisma.category.findUnique({ where: { id } });
    if (!category) {
      throw new Error('Category not found');
    }
    return category;
  }

  static async update(id: number, data: {
    name?: string;
    description?: string;
  }) {
    const category = await prisma.category.findUnique({ where: { id } });
    if (!category) {
      throw new Error('Category not found');
    }

    return await prisma.category.update({
      where: { id },
      data: {
        name: data.name ?? category.name,
        description: data.description ?? category.description,
      },
    });
  }

  static async delete(id: number) {
    const category = await prisma.category.findUnique({ where: { id } });
    if (!category) {
      throw new Error('Category not found');
    }

    return await prisma.category.delete({ where: { id } });
  }
}
