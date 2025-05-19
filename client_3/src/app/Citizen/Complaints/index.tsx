import CitizenLayout from "../../../layouts/CitizenLayout";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  Menu,
  Modal,
  Alert,
  Stack,
} from "@mantine/core";
import { useAppDispatch } from "../../../redux/store";
import {
  escalateComplaint,
  getAllUserComplaints,
} from "../../../redux/slices/complaint";
import { decodeToken } from "../../../utils/auth";
import { formatDate } from "utils";
import AsyncSelect from "components/ui/Select";
import { useSelector } from "react-redux";

const ViewMyComplaints = () => {
  const dispatch = useAppDispatch();
  const { userId } = decodeToken();

  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedComplaint, setSelectedComplaint] = useState<any>(null);
  const [isEscalateModalOpen, setIsEscalateModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleCategoryChange = (value: any) => {
    setSelectedCategory(value?.id);
  };
  useEffect(()=>{
    dispatch(getAllUserComplaints(userId));
  },[])

  const { allUserComplaints, isEscalatingComplaint } = useSelector(
    ({ complaint }: { complaint: any }) => ({
      allUserComplaints: complaint.allUserComplaints,
      isEscalatingComplaint: complaint.isEscalatingComplaint,
    })
  );

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
      await dispatch(escalateComplaint(selectedComplaint.id));
      setSuccess("Complaint escalated successfully!");
      setIsEscalateModalOpen(false);
      setSelectedComplaint(null);
      setError(null);
      await dispatch(getAllUserComplaints(userId));
    } catch (err) {
      setError("Failed to escalate complaint. Please try again.");
    }
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
                  { value: "pending", label: "Pending" },
                  { value: "in_progress", label: "In Progress" },
                  { value: "resolved", label: "Resolved" },
                  { value: "escalated", label: "Escalated" },
                ]}
              />

              <AsyncSelect
                label="Category"
                placeholder="Select category"
                datasrc="/category/all"
                accessorKey="id"
                labelKey="name"
                required
                value={selectedCategory}
                setActive={handleCategoryChange}
              />
            </Group>
          </Group>

          <Table striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Title</Table.Th>
                <Table.Th>Description</Table.Th>
                <Table.Th>Location</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Category</Table.Th>
                <Table.Th>Date</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {filteredComplaints.map((complaint: any) => (
                <Table.Tr key={complaint.id}>
                  <Table.Td>{complaint.title}</Table.Td>
                  <Table.Td>{complaint.description}</Table.Td>
                  <Table.Td>{complaint.location}</Table.Td>
                  <Table.Td>
                    <Badge
                      color={
                        complaint.status === "pending"
                          ? "blue"
                          : complaint.status === "in_progress"
                            ? "yellow"
                            : complaint.status === "resolved"
                              ? "green"
                              : "red"
                      }
                    >
                      {complaint.status.replace("_", " ").toUpperCase()}
                    </Badge>
                  </Table.Td>
                  <Table.Td>{complaint.categoryName}</Table.Td>
                  <Table.Td>{formatDate(complaint.createdAt)}</Table.Td>
                  <Table.Td>
                    <Menu>
                      <Menu.Target>
                        <Button variant="subtle">Actions</Button>
                      </Menu.Target>
                      <Menu.Dropdown>
                        <Menu.Item
                          onClick={() => {
                            setSelectedComplaint(complaint);
                            setIsEscalateModalOpen(true);
                          }}
                          color="red"
                        >
                          Escalate
                        </Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Card>

        <Modal
          opened={isEscalateModalOpen}
          onClose={() => {
            setIsEscalateModalOpen(false);
            setSelectedComplaint(null);
          }}
          title="Escalate Complaint"
        >
          <Stack mb="md">
            <Text size="sm">
              Are you sure you want to escalate this complaint?
            </Text>

            <Group justify="right">
              <Button
                variant="outline"
                onClick={() => setIsEscalateModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                loading={isEscalatingComplaint}
                color="red"
                onClick={handleEscalate}
              >
                Escalate
              </Button>
            </Group>
          </Stack>
        </Modal>
      </Container>
    </CitizenLayout>
  );
};

export default ViewMyComplaints;
