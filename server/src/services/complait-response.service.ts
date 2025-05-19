import prisma from "@/configs/db.config";
import { ApprovalStatus, ComplaintStatus } from "@prisma/client";

export class ComplaintResponseService {
  /**
   * Create a response to a complaint if its status is UNDER_REVIEW or RESOLVED.
   */
  static async createResponse(data: {
    complaintId: number;
    staffId: number;
    content: string;
    isOfficialResponse?: boolean;
  }) {
    const { complaintId, staffId, content,isOfficialResponse } = data;

    const complaint = await prisma.complaint.findUnique({
      where: { id: complaintId },
      select: { status: true },
    });

    if (!complaint) {
      throw new Error("Complaint not found");
    }

    if (!([ComplaintStatus.UNDER_REVIEW, ComplaintStatus.RESOLVED]as unknown as any).includes(complaint.status)) {
      throw new Error("Responses are only allowed when complaint is under review or resolved.");
    }

    return prisma.response.create({
      data: {
        complaintId,
        userId: staffId,
        content,
        createdAt: new Date(),
        isOfficialResponse: isOfficialResponse,
      },
    });
  }

  static async getResponsesByComplaint(complaintId: number) {
    return prisma.response.findMany({
      where: { complaintId },
      orderBy: { createdAt: "asc" },
      include: {
        user: {
          select: { id: true, name: true, role: true, email: true },
        },
      },
    });
  }

  static async updateResponse(responseId: number, data: { content?: string }) {
    return prisma.response.update({
      where: { id: responseId },
      data: {
        content: data.content,
      },
    });
  }

  static async fetchResponseById(responseId: number) {
    return prisma.response.findUnique({
      where: { id: responseId },
    });
  }

  static async getResponsesByStaff(staffId: number) {
    return prisma.response.findMany({
      where: { userId: staffId },
      orderBy: { createdAt: "desc" },
      include: {
        complaint: true,
      },
    });
  }

}
