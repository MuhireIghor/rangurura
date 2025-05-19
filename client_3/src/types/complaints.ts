export interface Complaint {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'pending' | 'resolved' | 'in_progress';
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  agency: {
    id: string;
    name: string;
  };
  response?: {
    text: string;
    createdAt: string;
    admin: {
      id: string;
      name: string;
    };
  };
}

export interface UpdateComplaintStatus {
  id: string;
  status: 'pending' | 'resolved' | 'in_progress';
}

export interface CreateComplaintResponse {
  complaintId: string;
  text: string;
}
