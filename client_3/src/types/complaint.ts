export interface Complaint {
  id: string
  title: string
  description: string
  category: string
  subcategory?: string
  location: string
  status: "pending" | "in-progress" | "resolved" | "rejected"
  priority: "low" | "medium" | "high" | "urgent"
  attachments?: string[]
  citizenId: string
  citizenName: string
  citizenEmail: string
  assignedTo?: string
  assignedDepartment?: string
  response?: string
  responseBy?: string
  responseAt?: string
  createdAt: string
  updatedAt: string
}

export interface ComplaintCategory {
  id: string
  name: string
  subcategories: string[]
}
