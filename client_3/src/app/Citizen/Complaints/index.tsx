// /* eslint-disable @typescript-eslint/no-explicit-any */
// import CitizenLayout from "../../../layouts/CitizenLayout";

// import { useEffect, useState } from "react";
// import {
//   Table,
//   Button,
//   Group,
//   Select,
//   TextInput,
//   Text,
//   Title,
//   Container,
//   Card,
//   Badge,
//   Menu,
//   Modal,
//   Alert,
//   Stack,
// } from "@mantine/core";
// import { useAppDispatch } from "../../../redux/store";
// import {
//   escalateComplaint,
//   getAllUserComplaints,
// } from "../../../redux/slices/complaint";
// import { decodeToken } from "../../../utils/auth";
// import { formatDate } from "utils";
// import AsyncSelect from "components/ui/Select";
// import { useSelector } from "react-redux";

// const ViewMyComplaints = () => {
//   const dispatch = useAppDispatch();
//   const { userId } = decodeToken();

//   const [search, setSearch] = useState("");
//   const [selectedStatus, setSelectedStatus] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [selectedComplaint, setSelectedComplaint] = useState<any>(null);
//   const [isEscalateModalOpen, setIsEscalateModalOpen] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [success, setSuccess] = useState<string | null>(null);

//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const handleCategoryChange = (value: any) => {
//     setSelectedCategory(value?.id);
//   };
//   useEffect(()=>{
//     dispatch(getAllUserComplaints(userId));
//   },[])

//   const { allUserComplaints, isEscalatingComplaint } = useSelector(
//     ({ complaint }: { complaint: any }) => ({
//       allUserComplaints: complaint.allUserComplaints,
//       isEscalatingComplaint: complaint.isEscalatingComplaint,
//     })
//   );

//   const filteredComplaints = allUserComplaints.filter((complaint: any) => {
//     const matchesSearch =
//       complaint.title.toLowerCase().includes(search.toLowerCase()) ||
//       complaint.description.toLowerCase().includes(search.toLowerCase()) ||
//       complaint.location.toLowerCase().includes(search.toLowerCase());

//     const matchesStatus =
//       !selectedStatus || complaint.status === selectedStatus;
//     const matchesCategory =
//       !selectedCategory || complaint.categoryId === selectedCategory;

//     return matchesSearch && matchesStatus && matchesCategory;
//   });

//   const handleEscalate = async () => {
//     if (!selectedComplaint) {
//       setError("Please select a complaint");
//       return;
//     }

//     try {
//       await dispatch(escalateComplaint(selectedComplaint.id));
//       setSuccess("Complaint escalated successfully!");
//       setIsEscalateModalOpen(false);
//       setSelectedComplaint(null);
//       setError(null);
//       await dispatch(getAllUserComplaints(userId));
//     } catch (err:any) {
//       console.log(err);
//       setError("Failed to escalate complaint. Please try again.");
//     }
//   };

//   return (
//     <CitizenLayout>
//       <Container size="lg" py="xl">
//         <Card shadow="sm" p="lg" radius="md" withBorder>
//           <Title order={2} mb="md">
//             My Complaints
//           </Title>

//           {error && (
//             <Alert color="red" title="Error" mb="md">
//               {error}
//             </Alert>
//           )}

//           {success && (
//             <Alert color="green" title="Success" mb="md">
//               {success}
//             </Alert>
//           )}

//           <Group justify="space-between" mb="md">
//             <TextInput
//               placeholder="Search complaints..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               leftSection={<Text size="sm">🔍</Text>}
//             />

//             <Group>
//               <Select
//                 placeholder="Filter by status"
//                 value={selectedStatus}
//                 onChange={(value) => setSelectedStatus(value!)}
//                 data={[
//                   { value: "pending", label: "Pending" },
//                   { value: "in_progress", label: "In Progress" },
//                   { value: "resolved", label: "Resolved" },
//                   { value: "escalated", label: "Escalated" },
//                 ]}
//               />

//               <AsyncSelect
//                 label="Category"
//                 placeholder="Select category"
//                 datasrc="/category/all"
//                 accessorKey="id"
//                 labelKey="name"
//                 required
//                 value={selectedCategory}
//                 setActive={handleCategoryChange}
//               />
//             </Group>
//           </Group>

//           <Table striped highlightOnHover>
//             <Table.Thead>
//               <Table.Tr>
//                 <Table.Th>Title</Table.Th>
//                 <Table.Th>Description</Table.Th>
//                 <Table.Th>Location</Table.Th>
//                 <Table.Th>Status</Table.Th>
//                 <Table.Th>Category</Table.Th>
//                 <Table.Th>Date</Table.Th>
//                 <Table.Th>Actions</Table.Th>
//               </Table.Tr>
//             </Table.Thead>
//             <Table.Tbody>
//               {filteredComplaints.map((complaint: any) => (
//                 <Table.Tr key={complaint.id}>
//                   <Table.Td>{complaint.title}</Table.Td>
//                   <Table.Td>{complaint.description}</Table.Td>
//                   <Table.Td>{complaint.location}</Table.Td>
//                   <Table.Td>
//                     <Badge
//                       color={
//                         complaint.status === "pending"
//                           ? "blue"
//                           : complaint.status === "in_progress"
//                             ? "yellow"
//                             : complaint.status === "resolved"
//                               ? "green"
//                               : "red"
//                       }
//                     >
//                       {complaint.status.replace("_", " ").toUpperCase()}
//                     </Badge>
//                   </Table.Td>
//                   <Table.Td>{complaint.categoryName}</Table.Td>
//                   <Table.Td>{formatDate(complaint.createdAt)}</Table.Td>
//                   <Table.Td>
//                     <Menu>
//                       <Menu.Target>
//                         <Button variant="subtle">Actions</Button>
//                       </Menu.Target>
//                       <Menu.Dropdown>
//                         <Menu.Item
//                           onClick={() => {
//                             setSelectedComplaint(complaint);
//                             setIsEscalateModalOpen(true);
//                           }}
//                           color="red"
//                         >
//                           Escalate
//                         </Menu.Item>
//                       </Menu.Dropdown>
//                     </Menu>
//                   </Table.Td>
//                 </Table.Tr>
//               ))}
//             </Table.Tbody>
//           </Table>
//         </Card>

//         <Modal
//           opened={isEscalateModalOpen}
//           onClose={() => {
//             setIsEscalateModalOpen(false);
//             setSelectedComplaint(null);
//           }}
//           title="Escalate Complaint"
//         >
//           <Stack mb="md">
//             <Text size="sm">
//               Are you sure you want to escalate this complaint?
//             </Text>

//             <Group justify="right">
//               <Button
//                 variant="outline"
//                 onClick={() => setIsEscalateModalOpen(false)}
//               >
//                 Cancel
//               </Button>
//               <Button
//                 loading={isEscalatingComplaint}
//                 color="red"
//                 onClick={handleEscalate}
//               >
//                 Escalate
//               </Button>
//             </Group>
//           </Stack>
//         </Modal>
//       </Container>
//     </CitizenLayout>
//   );
// };

// export default ViewMyComplaints;

/* eslint-disable @typescript-eslint/no-explicit-any */
import CitizenLayout from "../../../layouts/CitizenLayout";
import { useEffect, useState } from "react";
import {
  Table,
  Button,
  Group,
  Select,
  TextInput,
  Text,
  Title,
  Container,
  Card,
  Badge,
  Modal,
  Alert,
  Stack,
  Textarea,
  Avatar,
  Paper,
  Divider,
  LoadingOverlay,
  ActionIcon,
} from "@mantine/core";
import { useAppDispatch } from "../../../redux/store";
import {
  escalateComplaint,
  getAllUserComplaints,
} from "../../../redux/slices/complaint";
import { createResponse } from "../../../redux/slices/complaintResponse";
import { decodeToken } from "../../../utils/auth";
import { formatDate } from "utils";
import AsyncSelect from "components/ui/Select";
import { useSelector } from "react-redux";
import { showToast } from "utils/notify";
import ToastContainer from "components/molecules/Toast";
import { MessageCircle, Send, AlertTriangle } from "lucide-react";

const ViewMyComplaints = () => {
  const dispatch = useAppDispatch();
  const { userId } = decodeToken();

  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedComplaint, setSelectedComplaint] = useState<any>(null);
  const [isEscalateModalOpen, setIsEscalateModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [responseText, setResponseText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const { allUserComplaints, isEscalatingComplaint, isLoading } = useSelector(
    ({ complaint }: { complaint: any }) => ({
      allUserComplaints: complaint.allUserComplaints,
      isEscalatingComplaint: complaint.isEscalatingComplaint,
      isLoading: complaint.isLoading,
    })
  );

  useEffect(() => {
    dispatch(getAllUserComplaints(userId));
  }, [dispatch, userId]);

  const handleCategoryChange = (value: any) => {
    setSelectedCategory(value?.id);
  };

  const filteredComplaints = allUserComplaints.filter((complaint: any) => {
    const matchesSearch =
      complaint.title.toLowerCase().includes(search.toLowerCase()) ||
      complaint.description.toLowerCase().includes(search.toLowerCase()) ||
      complaint.location.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      !selectedStatus || complaint.status === selectedStatus;
    const matchesCategory =
      !selectedCategory || complaint.categoryId === selectedCategory;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleEscalate = async () => {
    if (!selectedComplaint) {
      setError("Please select a complaint");
      return;
    }

    try {
      const res: any = await dispatch(escalateComplaint(selectedComplaint.id));
      console.log(res, "here is the escalation response");
      setSuccess(
        res.error
          ? "Failed to escalate complaint"
          : "Complaint Escalated Successfully"
      );
      setIsEscalateModalOpen(false);
      setSelectedComplaint(null);
      setError(null);
      await dispatch(getAllUserComplaints(userId));
    } catch (err: any) {
      console.log(err);
      setError("Failed to escalate complaint. Please try again.");
    }
  };

  const handleViewDetails = (complaint: any) => {
    setSelectedComplaint(complaint);
    setIsDetailsModalOpen(true);
  };

  const handleSendResponse = async () => {
    if (!responseText.trim()) return;

    setIsSubmitting(true);
    try {
      await dispatch(
        createResponse({
          complaintId: selectedComplaint.id,
          content: responseText,
          staffId: userId,
        })
      ).unwrap();

      setResponseText("");
      showToast(
        <ToastContainer
          title="Success"
          description="Response sent successfully"
        />,
        "success"
      );
      // Refresh complaint details
      await dispatch(getAllUserComplaints(userId));
      const updatedComplaint = allUserComplaints.find(
        (c: any) => c.id === selectedComplaint.id
      );
      if (updatedComplaint) {
        setSelectedComplaint(updatedComplaint);
      }
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

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { color: string; label: string }> = {
      pending: { color: "blue", label: "Pending" },
      in_progress: { color: "yellow", label: "In Progress" },
      resolved: { color: "green", label: "Resolved" },
      escalated: { color: "red", label: "Escalated" },
    };

    const config = statusConfig[status] || { color: "gray", label: status };
    return (
      <Badge color={config.color} variant="light">
        {config.label}
      </Badge>
    );
  };

  return (
    <CitizenLayout>
      <Container size="lg" py="xl">
        <Card shadow="sm" p="lg" radius="md" withBorder>
          <Title order={2} mb="md">
            My Complaints
          </Title>

          {error && (
            <Alert color="red" title="Error" mb="md">
              {error}
            </Alert>
          )}

          {success && (
            <Alert color="green" title="Success" mb="md">
              {success}
            </Alert>
          )}

          <Group justify="space-between" mb="md">
            <TextInput
              placeholder="Search complaints..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              leftSection={<Text size="sm">🔍</Text>}
            />

            <Group>
              <Select
                placeholder="Filter by status"
                value={selectedStatus}
                onChange={(value) => setSelectedStatus(value!)}
                data={[
                  { value: "", label: "All Statuses" },
                  { value: "SUBMITTED", label: "Submitted" },
                  { value: "UNDER_REVIEW", label: "Under Review" },
                  { value: "RESPONDED", label: "Responded" },
                  { value: "ESCALATED", label: "Escalated" },
                  { value: "RESOLVED", label: "Resolved" },
                ]}
                clearable
              />

              <AsyncSelect
                label="Category"
                placeholder="Select category"
                datasrc="/category/all"
                accessorKey="id"
                labelKey="name"
                value={selectedCategory}
                setActive={handleCategoryChange}
              />
            </Group>
          </Group>

          <div className="relative">
            <LoadingOverlay visible={isLoading} />
            <Table striped highlightOnHover>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Title</Table.Th>
                  <Table.Th>Status</Table.Th>
                  <Table.Th>Category</Table.Th>
                  <Table.Th>Date</Table.Th>
                  <Table.Th>Actions</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {filteredComplaints.length > 0 ? (
                  filteredComplaints.map((complaint: any) => (
                    <Table.Tr key={complaint.id}>
                      <Table.Td>
                        <Text fw={500} lineClamp={1}>
                          {complaint.title}
                        </Text>
                        <Text size="sm" c="dimmed" lineClamp={1}>
                          {complaint.description}
                        </Text>
                      </Table.Td>
                      <Table.Td>{getStatusBadge(complaint.status)}</Table.Td>
                      <Table.Td>{complaint.categoryName}</Table.Td>
                      <Table.Td>{formatDate(complaint.createdAt)}</Table.Td>
                      <Table.Td>
                        <Group gap="xs">
                          <ActionIcon
                            variant="subtle"
                            color="blue"
                            onClick={() => handleViewDetails(complaint)}
                            title="View Details"
                          >
                            <MessageCircle size={18} />
                          </ActionIcon>
                          {complaint.currentLevel !== "LEVEL_2" && (
                            <ActionIcon
                              variant="subtle"
                              color="red"
                              onClick={() => {
                                setSelectedComplaint(complaint);
                                setIsEscalateModalOpen(true);
                              }}
                              title="Escalate"
                            >
                              <AlertTriangle size={18} />
                            </ActionIcon>
                          )}
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
          </div>
        </Card>
      </Container>

      {/* Complaint Details Modal */}
      <Modal
        opened={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        title="Complaint Details"
        size="lg"
      >
        {selectedComplaint && (
          <Stack gap="md">
            <Paper p="md" withBorder>
              <Group justify="space-between" mb="sm">
                <Text fw={600} size="lg">
                  {selectedComplaint.title}
                </Text>
                {getStatusBadge(selectedComplaint.status)}
              </Group>

              <Text c="dimmed" mb="md">
                {formatDate(selectedComplaint.createdAt)}
              </Text>

              <Text mb="sm">{selectedComplaint.description}</Text>

              <Group gap="xs">
                <Badge variant="outline">
                  {selectedComplaint.categoryName}
                </Badge>
                <Badge variant="outline" color="blue">
                  {selectedComplaint.location}
                </Badge>
              </Group>
            </Paper>
            <Divider my="sm" />
            <Text fw={600} size="md">
              Responses
            </Text>
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
                  const isCurrentUser = response.user.id === userId;
                  return (
                    <Group
                      key={response.id}
                      justify={isCurrentUser ? "flex-end" : "flex-start"}
                      style={{ width: "100%" }}
                    >
                      {!isCurrentUser && (
                        <Avatar size="sm" radius="xl" color="blue">
                          {response.user.name.charAt(0).toUpperCase()}
                        </Avatar>
                      )}
                      <Stack gap={4} style={{ maxWidth: "80%" }}>
                        <Paper
                          p="sm"
                          withBorder
                          style={{
                            backgroundColor: isCurrentUser
                              ? "#006C4A"
                              : "white",
                            color: isCurrentUser ? "white" : "inherit",
                            borderRadius: isCurrentUser
                              ? "12px 12px 0 12px"
                              : "12px 12px 12px 0",
                          }}
                        >
                          <Text size="sm">{response.content}</Text>
                        </Paper>
                        <Text
                          size="xs"
                          c="dimmed"
                          ta={isCurrentUser ? "right" : "left"}
                        >
                          {formatDate(response.createdAt)}
                        </Text>
                      </Stack>
                      {isCurrentUser && (
                        <Avatar size="sm" radius="xl" color="green">
                          Me
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
            <Divider my="sm" />
            <Paper p="md" withBorder style={{ marginTop: "auto" }}>
              <Textarea
                disabled={
                  selectedComplaint.currentLevel === "LEVEL_2" &&
                  selectedComplaint.status === "RESOLVED"
                }
                placeholder="Type your response..."
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
          </Stack>
        )}
      </Modal>

      {/* Escalate Modal */}
      <Modal
        opened={isEscalateModalOpen}
        onClose={() => setIsEscalateModalOpen(false)}
        title="Escalate Complaint"
      >
        <Text mb="md">
          Are you sure you want to escalate this complaint? This will notify the
          relevant authorities.
        </Text>
        <Group justify="flex-end">
          <Button
            variant="default"
            onClick={() => setIsEscalateModalOpen(false)}
          >
            Cancel
          </Button>
          <Button
            color="red"
            onClick={handleEscalate}
            loading={isEscalatingComplaint}
          >
            Escalate
          </Button>
        </Group>
      </Modal>
    </CitizenLayout>
  );
};

export default ViewMyComplaints;
