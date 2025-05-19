import prisma from "@/configs/db.config";
import {
  ComplaintPriority,
  ComplaintStatus,
  ComplaintLevel, // ✅ imported new enum
} from "@prisma/client";

export class ComplaintService {
  static async create(data: {
    title: string;
    description: string;
    location?: string;
    priority?: ComplaintPriority;
    userId: number;
    categoryId: number;
    agencyId: number;
  }) {
    return prisma.complaint.create({
      data: {
        title: data.title,
        description: data.description,
        location: data.location,
        priority: data.priority || ComplaintPriority.MEDIUM,
        userId: data.userId,
        categoryId: data.categoryId,
        agencyId: data.agencyId,
        status: ComplaintStatus.SUBMITTED,
        currentLevel: ComplaintLevel.LEVEL_1,
      },
    });
  }

  static async getById(id: number) {
    return prisma.complaint.findUnique({
      where: { id },
      include: {
        user: {
          omit:{
            confirmPassword:true,
            password:true
          }
        },
        agency: true,
        category: true,
        attachments: true,
        responses: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                role: true,
              },
            },
          },
          orderBy: { createdAt: "asc" },
        },
      },
    });
  }

  static async getByUser(userId: number) {
    return prisma.complaint.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: {
        responses: {
          include: {
            user: {
              omit: {
                confirmPassword: true,
                password:true
              },
            },
          },
        },
      },
    });
  }

  static async getAll() {
    return prisma.complaint.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        agency: true,
        category: true,
        user: true,
        responses: {
          include: {
            user: {
              omit: {
                confirmPassword: true,
                password:true
              },
            },
          },
        },
      },
    });
  }

  static async update(
    id: number,
    data: {
      title?: string;
      description?: string;
      location?: string;
      priority?: ComplaintPriority;
      userId?: number;
      categoryId?: number;
      agencyId?: number;
    }
  ) {
    const complaint = await prisma.complaint.findUnique({ where: { id } });
    if (!complaint) throw new Error("Complaint not found");

    return prisma.complaint.update({
      where: { id },
      data: {
        title: data.title ?? complaint.title,
        description: data.description ?? complaint.description,
        location: data.location ?? complaint.location,
        priority: data.priority ?? complaint.priority,
        userId: data.userId ?? complaint.userId,
        categoryId: data.categoryId ?? complaint.categoryId,
        agencyId: data.agencyId ?? complaint.agencyId,
      },
    });
  }

  static async escalateLevel(id: number, userId: number) {
    const complaint = await prisma.complaint.findUnique({ where: { id } });
    if (!complaint) throw new Error("Complaint not found");
    if (complaint.userId !== userId) throw new Error("Unauthorized");

    if (complaint.currentLevel === ComplaintLevel.LEVEL_2) {
      throw new Error("Already escalated to the highest level");
    }

    return prisma.complaint.update({
      where: { id },
      data: {
        currentLevel: ComplaintLevel.LEVEL_2,
        status: ComplaintStatus.ESCALATED,
      },
    });
  }

  static async markAsUnderReview(id: number) {
    return prisma.complaint.update({
      where: { id },
      data: {
        status: ComplaintStatus.UNDER_REVIEW,
      },
    });
  }

  static async markAsResponded(id: number) {
    return prisma.complaint.update({
      where: { id },
      data: {
        status: ComplaintStatus.RESPONDED,
      },
    });
  }

  static async markAsResolved(id: number) {
    return prisma.complaint.update({
      where: { id },
      data: {
        status: ComplaintStatus.RESOLVED,
      },
    });
  }

  static async attachFile(
    complaintId: number,
    fileUrl: string,
    uploadedBy: number,
    fileName: string,
    fileType: string
  ) {
    return prisma.attachment.create({
      data: {
        fileUrl,
        complaintId,
        uploadedBy,
        fileName,
        fileType,
      },
    });
  }
}
