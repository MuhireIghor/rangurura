import prisma from '@/configs/db.config';

export class AgencyService {
  // Create a new agency
  static async createAgency(data: {
    name: string;
    description?: string;
    contactEmail: string;
    contactPhone?: string;
  }) {
    const { name, description, contactEmail, contactPhone } = data;

    // Optional: Check if agency already exists by name or email
    const existingAgency = await prisma.agency.findFirst({
      where: {
        OR: [
          { name },
          { contactEmail }
        ]
      }
    });
    if (existingAgency) {
      throw new Error('Agency with this name or contact email already exists');
    }

    const agency = await prisma.agency.create({
      data: {
        name,
        description,
        contactEmail,
        contactPhone,
      }
    });
    console.log('Here is the created agency',agency)

    return agency;
  }

  // Fetch agency by ID
  static async fetchAgencyById(id: number) {
    const agency = await prisma.agency.findUnique({
      where: { id },
      include: {
        categories: true,
        complaints: true,
        staff: {
          include: {
            user: true
          }
        }
      }
    });

    if (!agency) throw new Error("Agency not found");
    return agency;
  }

  // List all agencies
  static async findAgencies() {
    return await prisma.agency.findMany({
      include: {
        categories: true,
        staff: true,
      }
    });
  }

  static async deleteAgencyById(id: number) {
    const agency = await prisma.agency.delete({
      where: { id },
    });
    return agency;
  }
  static async updateAgency (agencyId:number,data:any){
    const agency = await prisma.agency.update({
      where: { id: agencyId },
      data: data,
    });
    return agency;
  }

}
