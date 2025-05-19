/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import AdminLayout from "../../../layouts/AdminLayout";
import {
  Card,
  Table,
  Group,
  Button,
  Text,
  Badge,
  Modal,
  Textarea,
  Stack,
  TextInput,
  Title,
  Select,
  Paper,
} from "@mantine/core";
import { 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  MessageSquare, 
  User, 
  Building2,
  Tag,
  AlertTriangle,
  Check,
  X
} from "lucide-react";



import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../redux/store";
import { 
  getAllSystemComplaints, 
  markComplaintAsResolved, 
  markComplaintAsUnderReview, 
} from "../../../redux/slices/complaint";
import { notifications } from "@mantine/notifications";
import { createResponse } from "../../../redux/slices/complaintResponse";
import { decodeToken } from "utils/auth";

interface ComplaintFilters {
  status: "all" | "pending" | "resolved" | "in_progress";
  category: string;
}

const ComplaintViewByAdmin = () => {
  const dispatch = useAppDispatch();
  const [filters, setFilters] = useState<ComplaintFilters>({
    status: "all",
    category: "",
  });
  const [selectedComplaint, setSelectedComplaint] = useState<any | null>(null);
  const [responseText, setResponseText] = useState("");
  const [showComplaintDetails, setShowComplaintDetails] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { allSystemComplaints, isLoadingAllSystemComplaints } = useSelector(
    ({ complaint }: { complaint: any }) => ({
      allSystemComplaints: complaint.allSystemComplaints,
      isLoadingAllSystemComplaints: complaint.isLoadingAllSystemComplaints,
    })
  );

  useEffect(()=>{
    dispatch(getAllSystemComplaints())

  },[])
  const statusColors = {
    SUBMITTED: "yellow",
    UNDER_REVIEW: "blue",
    RESPONDED: "indigo",
    ESCALATED: "orange",
    RESOLVED: "green",
  };
  const {userId} = decodeToken();

  const statusIcons = {
    SUBMITTED: <Clock size={16} />,
    UNDER_REVIEW: <AlertCircle size={16} />,
    RESPONDED: <CheckCircle2 size={16} />,
    ESCALATED: <AlertTriangle size={16} />,
    RESOLVED: <Check size={16} />,
  };

  const handleStatusUpdate = async (status: any) => {
    if (!selectedComplaint) return;
    
    setIsSubmitting(true);
    try {
      await dispatch(markComplaintAsUnderReview(selectedComplaint.id));
      
      // Show success notification
      notifications.show({
        title: "Success",
        message: `Complaint marked as ${status.toLowerCase().replace(/_/g, ' ')}`,
        color: "green",
      });
      
      // Refresh the complaints list
      dispatch(getAllSystemComplaints());
      setShowComplaintDetails(false);
    } catch (err) {
      console.error('Error updating status:', err);
      notifications.show({
        title: "Error",
        message: "Failed to update complaint status",
        color: "red",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleMarkAsResolved = async (status: any) => {
    if (!selectedComplaint) return;
    
    setIsSubmitting(true);
    try {
      await dispatch(markComplaintAsResolved(selectedComplaint.id));
      
      // Show success notification
      notifications.show({
        title: "Success",
        message: `Complaint marked as ${status.toLowerCase().replace(/_/g, ' ')}`,
        color: "green",
      });
      
      // Refresh the complaints list
      dispatch(getAllSystemComplaints());
      setShowComplaintDetails(false);
    } catch (err) {
      console.error('Error updating status:', err);
      notifications.show({
        title: "Error",
        message: "Failed to update complaint status",
        color: "red",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleSendResponse = async () => {
    if (!selectedComplaint || !responseText.trim()) return;
    
    setIsSubmitting(true);
    try {
      dispatch(createResponse({
        complaintId:selectedComplaint.id,
        content:responseText,
        staffId:userId
      }))
    } catch (err) {
      console.error('Error sending response:', err);
      notifications.show({
        title: "Error",
        message: "Failed to send response",
        color: "red",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const renderStatusBadge = (status: string) => {
    const color = statusColors[status as keyof typeof statusColors] || 'gray';
    const Icon = statusIcons[status as keyof typeof statusIcons] || <X size={16} />;
    
    return (
      <Badge
        color={color}
        leftSection={Icon}
        variant="light"
        size="md"
      >
        {status.replace(/_/g, ' ')}
      </Badge>
    );
  };

  if (isLoadingAllSystemComplaints) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <Text>Loading complaints...</Text>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <Card shadow="sm" p="lg" radius="md" withBorder>
        <Title order={2} mb="md">
          All Complaints
        </Title>

        {/* Filters */}
        <Group mb="md">
          <Select
            value={filters.status}
            onChange={(value) =>
              setFilters((prev) => ({
                ...prev,
                status: value as ComplaintFilters["status"],
              }))
            }
            data={[
              { value: "all", label: "All Statuses" },
              { value: "pending", label: "Pending" },
              { value: "resolved", label: "Resolved" },
              { value: "in_progress", label: "In Progress" },
            ]}
            placeholder="Filter by status"
          />

          <TextInput
            value={filters.category}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                category: e.currentTarget.value,
              }))
            }
            placeholder="Filter by category"
          />
        </Group>

        {/* Complaints Table */}
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Title</Table.Th>
              <Table.Th>Category</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Agency</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {allSystemComplaints?.map((complaint: any) => (
              <Table.Tr key={complaint.id}>
                <Table.Td>
                  <Group>
                    <Table.Td>
                      <Text fw={500}>{complaint.title}</Text>
                      <Text size="sm" c="dimmed">
                        {new Date(complaint.createdAt).toLocaleDateString()}
                      </Text>
                    </Table.Td>
                  </Group>
                </Table.Td>
                <Table.Td>{complaint.category?.name || 'N/A'}</Table.Td>
                <Table.Td>
                  {renderStatusBadge(complaint.status)}
                </Table.Td>
                <Table.Td>{complaint.agency?.name || 'N/A'}</Table.Td>
                <Table.Td>
                  <Group gap="xs">
                      <Button
                        variant="outline"
                        color="blue"
                        size="sm"
                        leftSection={<MessageSquare size={16} />}
                        onClick={() => {
                          setSelectedComplaint(complaint);
                          setShowComplaintDetails(true);
                        }}
                      >
                        View Details
                      </Button>
                  </Group>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Card>

      {/* Complaint Details Modal */}
      <Modal
        opened={showComplaintDetails}
        onClose={() => setShowComplaintDetails(false)}
        title="Complaint Details"
        size="lg"
      >
        {selectedComplaint && (
          <Stack gap="md">
            {/* Complaint Header */}
            <Group justify="space-between">
              <Text fw={700} size="lg">{selectedComplaint.title || 'No title'}</Text>
              {renderStatusBadge(selectedComplaint.status)}
            </Group>
            
            {/* Complaint Meta */}
            <Paper p="md" withBorder>
              <Stack gap="sm">
                <Group>
                  <User size={16} />
                  <Text>Complainant: {selectedComplaint.user?.name || 'Anonymous'}</Text>
                </Group>
                <Group>
                  <Building2 size={16} />
                  <Text>Agency: {selectedComplaint.agency?.name || 'N/A'}</Text>
                </Group>
                <Group>
                  <Tag size={16} />
                  <Text>Category: {selectedComplaint.category?.name || 'Uncategorized'}</Text>
                </Group>
                <Group>
                  <Clock size={16} />
                  <Text>Created: {new Date(selectedComplaint.createdAt).toLocaleString()}</Text>
                </Group>
              </Stack>
            </Paper>
            
            {/* Complaint Description */}
            <div>
              <Text fw={600} mb="xs">Description</Text>
              <Text>{selectedComplaint.description || 'No description provided'}</Text>
            </div>
            
            {/* Existing Responses */}
            {selectedComplaint.responses && selectedComplaint.responses.length > 0 && (
              <div>
                <Text fw={600} mb="xs">Responses</Text>
                <Stack gap="md">
                  {selectedComplaint.responses.map((response: any, index: any) => (
                    <Paper key={index} p="md" withBorder>
                      <Group justify="space-between" mb="xs">
                      <Text>{response.user.name}</Text>
                        <Text size="sm" c="dimmed">
                          {new Date(response.createdAt).toLocaleString()}
                        </Text>
                      </Group>
                      <Text>{response.content}</Text>
                    </Paper>
                  ))}
                </Stack>
              </div>
            )}
            
            {/* Response Form */}
            <div>
              <Text fw={600} mb="xs">
                {selectedComplaint.status === 'RESPONDED' ? 'Add another response' : 'Your Response'}
              </Text>
              <Textarea
                value={responseText}
                onChange={(e) => setResponseText(e.target.value)}
                placeholder="Type your response here..."
                minRows={3}
                mb="md"
              />
              
              {/* Action Buttons */}
              <Group justify="flex-end" gap="sm">
                <Button 
                  variant="outline" 
                  onClick={() => setShowComplaintDetails(false)}
                  disabled={isSubmitting}
                >
                  Close
                </Button>
                
                {selectedComplaint.status === 'SUBMITTED' && (
                  <Button
                    variant="outline"
                    color="blue"
                    leftSection={<AlertCircle size={16} />}
                    onClick={() => handleStatusUpdate('UNDER_REVIEW')}
                    loading={isSubmitting}
                  >
                    Mark as Under Review
                  </Button>
                )}
                
                {['SUBMITTED', 'UNDER_REVIEW', 'ESCALATED', 'RESPONDED'].includes(selectedComplaint.status) && (
                  <Button
                    color="green"
                    leftSection={<Check size={16} />}
                    onClick={handleSendResponse}
                    loading={isSubmitting}
                    disabled={!responseText.trim()}
                  >
                    {selectedComplaint.status === 'RESPONDED' ? 'Add Response' : 'Send Response'}
                  </Button>
                )}
                
                {selectedComplaint.status !== 'RESOLVED' && (
                  <Button
                    color="teal"
                    leftSection={<CheckCircle2 size={16} />}
                    onClick={() => handleMarkAsResolved('RESOLVED')}
                    loading={isSubmitting}
                  >
                    Mark as Resolved
                  </Button>
                )}
              </Group>
            </div>
          </Stack>
        )}
      </Modal>
    </AdminLayout>
  );
};

export default ComplaintViewByAdmin;
