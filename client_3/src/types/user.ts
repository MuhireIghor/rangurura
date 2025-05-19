export interface User {
  id: string
  name: string
  email: string
  role: "citizen" | "admin"
  phoneNumber?: string
  address?: string
  department?: string
  position?: string
  profileImage?: string
  createdAt: string
  updatedAt: string
}
