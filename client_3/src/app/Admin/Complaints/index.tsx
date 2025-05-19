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
  Avatar,
  ActionIcon,
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
  X,
  Send,
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
import { showToast } from "utils/notify";
import ToastContainer from "components/molecules/Toast";
import { formatDate } from "utils";


const ComplaintViewByAdmin = () => {
  const dispatch = useAppDispatch();
  const [filters, setFilters] = useState<any>({
    status: "",
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
  const filteredComplaints = allSystemComplaints.filter((complaint: any) => {
    const matchesStatus =
      filters.status === "" || complaint.status === filters.status;
    const matchesCategory =
      !filters.category || complaint.categoryId === filters.category;

    return matchesStatus && matchesCategory;
  });

  useEffect(() => {
    dispatch(getAllSystemComplaints());
  }, []);
  const statusColors = {
    SUBMITTED: "yellow",
    UNDER_REVIEW: "blue",
    RESPONDED: "indigo",
    ESCALATED: "orange",
    RESOLVED: "green",
  };
  const { userId } = decodeToken();

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
        message: `Complaint marked as ${status.toLowerCase().replace(/_/g, " ")}`,
        color: "green",
      });

      // Refresh the complaints list
      dispatch(getAllSystemComplaints());
      setShowComplaintDetails(false);
    } catch (err) {
      console.error("Error updating status:", err);
      showToast(
        <ToastContainer
          title="Error"
          description="Failed to update complaint status"
        />,
        "error"
      );
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
        message: `Complaint marked as ${status.toLowerCase().replace(/_/g, " ")}`,
        color: "green",
      });

      // Refresh the complaints list
      dispatch(getAllSystemComplaints());
      setShowComplaintDetails(false);
    } catch (err) {
      console.error("Error updating status:", err);

      showToast(
        <ToastContainer
          title="Error"
          description="Failed to update complaint status"
        />,
        "error"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendResponse = async () => {
    if (!selectedComplaint || !responseText.trim()) return;

    setIsSubmitting(true);
    try {
      await dispatch(
        createResponse({
          complaintId: selectedComplaint.id,
          content: responseText,
          staffId: userId,
        })
      );
    } catch (err) {
      console.error("Error sending response:", err);
      showToast(
        <ToastContainer title="Error" description="Failed to send response" />,
        "error"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStatusBadge = (status: string) => {
    const color = statusColors[status as keyof typeof statusColors] || "gray";
    const Icon = statusIcons[status as keyof typeof statusIcons] || (
      <X size={16} />
    );

    return (
      <Badge color={color} leftSection={Icon} variant="light" size="md">
        {status.replace(/_/g, " ")}
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
              { value: "", label: "All Statuses" },
              { value: "SUBMITTED", label: "Submitted" },
              { value: "UNDER_REVIEW", label: "Under Review" },
              { value: "RESPONDED", label: "Responded" },
              { value: "ESCALATED", label: "Escalated" },
              { value: "RESOLVED", label: "Resolved" },
            ]}
            placeholder="Filter by status"
            clearable
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
            {filteredComplaints.length > 0 ? (
              filteredComplaints?.map((complaint: any) => (
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
                  <Table.Td>{complaint.category?.name || "N/A"}</Table.Td>
                  <Table.Td>{renderStatusBadge(complaint.status)}</Table.Td>
                  <Table.Td>{complaint.agency?.name || "N/A"}</Table.Td>
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
              ))
            ) : (
              <Table.Tr>
                <Table.Td colSpan={5} style={{ textAlign: "center" }}>
                  <Text c="dimmed" py="md">
                    No complaints found
                  </Text>
                </Table.Td>
              </Table.Tr>
            )}
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
              <Text fw={700} size="lg">
                {selectedComplaint.title || "No title"}
              </Text>
              {renderStatusBadge(selectedComplaint.status)}
            </Group>

            {/* Complaint Meta */}
            <Paper p="md" withBorder>
              <Stack gap="sm">
                <Group>
                  <User size={16} />
                  <Text>
                    Complainant: {selectedComplaint.user?.name || "Anonymous"}
                  </Text>
                </Group>
                <Group>
                  <Building2 size={16} />
                  <Text>Agency: {selectedComplaint.agency?.name || "N/A"}</Text>
                </Group>
                <Group>
                  <Tag size={16} />
                  <Text>
                    Category:{" "}
                    {selectedComplaint.category?.name || "Uncategorized"}
                  </Text>
                </Group>
                <Group>
                  <Clock size={16} />
                  <Text>
                    Created:{" "}
                    {new Date(selectedComplaint.createdAt).toLocaleString()}
                  </Text>
                </Group>
              </Stack>
            </Paper>

            {/* Complaint Description */}
            <div>
              <Text fw={600} mb="xs">
                Description
              </Text>
              <Text>
                {selectedComplaint.description || "No description provided"}
              </Text>
            </div>

            {/* Existing Responses */}
            <Stack
              gap="md"
              style={{
                maxHeight: 400,
                overflowY: "auto",
                padding: "16px",
                backgroundColor: "#f8f9fa",
                borderRadius: "8px",
              }}
            >
              {selectedComplaint.responses?.length > 0 ? (
                selectedComplaint.responses.map((response: any) => {
                  const isOfficial = response.isOfficialResponse;
                  return (
                    <Group
                      key={response.id}
                      justify={isOfficial ? "flex-end" : "flex-start"}
                      style={{ width: "100%" }}
                    >
                      {!isOfficial && (
                        <Avatar size="sm" radius="xl" color="blue">
                          {response.user?.name?.charAt(0)?.toUpperCase() || "C"}
                        </Avatar>
                      )}
                      <Stack gap={4} style={{ maxWidth: "80%" }}>
                        <Paper
                          p="sm"
                          withBorder
                          style={{
                            backgroundColor: isOfficial ? "#006C4A" : "white",
                            color: isOfficial ? "white" : "inherit",
                            borderRadius: isOfficial
                              ? "12px 12px 0 12px"
                              : "12px 12px 12px 0",
                          }}
                        >
                          <Text size="sm">{response.content}</Text>
                        </Paper>
                        <Text
                          size="xs"
                          c="dimmed"
                          ta={isOfficial ? "right" : "left"}
                        >
                          {formatDate(response.createdAt)}
                          {isOfficial && " • Official Response"}
                        </Text>
                      </Stack>
                      {isOfficial && (
                        <Avatar size="sm" radius="xl" color="green">
                          {response.user?.name?.charAt(0)?.toUpperCase() || "A"}
                        </Avatar>
                      )}
                    </Group>
                  );
                })
              ) : (
                <Text c="dimmed" ta="center" py="md">
                  No responses yet. Be the first to respond!
                </Text>
              )}
            </Stack>

            {/* Response Form */}
            <div>
              <Text fw={600} mb="xs">
                {selectedComplaint.status === "RESPONDED"
                  ? "Add another response"
                  : "Your Response"}
              </Text>
              <Paper p="md" withBorder style={{ marginTop: "auto" }}>
                <Textarea
                  placeholder="Type your official response..."
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                  minRows={3}
                  rightSection={
                    <ActionIcon
                      variant="subtle"
                      color="green"
                      onClick={handleSendResponse}
                      loading={isSubmitting}
                      disabled={!responseText.trim()}
                    >
                      <Send size={18} />
                    </ActionIcon>
                  }
                  rightSectionWidth={42}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendResponse();
                    }
                  }}
                />
              </Paper>

              {/* Action Buttons */}
              <Group justify="flex-end" gap="sm">
                <Button
                  variant="outline"
                  onClick={() => setShowComplaintDetails(false)}
                  disabled={isSubmitting}
                >
                  Close
                </Button>

                {selectedComplaint.status === "SUBMITTED" && (
                  <Button
                    variant="outline"
                    color="blue"
                    leftSection={<AlertCircle size={16} />}
                    onClick={() => handleStatusUpdate("UNDER_REVIEW")}
                    loading={isSubmitting}
                  >
                    Mark as Under Review
                  </Button>
                )}

                {[
                  "SUBMITTED",
                  "UNDER_REVIEW",
                  "ESCALATED",
                  "RESPONDED",
                  "RESOLVED",
                ].includes(selectedComplaint.status) && (
                  <Button
                    color="green"
                    leftSection={<Check size={16} />}
                    onClick={handleSendResponse}
                    loading={isSubmitting}
                    disabled={!responseText.trim()}
                  >
                    {selectedComplaint.status === "RESPONDED"
                      ? "Add Response"
                      : "Send Response"}
                  </Button>
                )}

                {selectedComplaint.status !== "RESOLVED" && (
                  <Button
                    color="teal"
                    leftSection={<CheckCircle2 size={16} />}
                    onClick={() => handleMarkAsResolved("RESOLVED")}
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
