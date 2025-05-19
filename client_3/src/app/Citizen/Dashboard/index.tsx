import { Group, Title, Button, Card, Text, SimpleGrid } from "@mantine/core";
import { Plus } from "lucide-react";
import CitizenLayout from "../../../layouts/CitizenLayout";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { decodeToken } from "utils/auth";
import { useAppDispatch } from "../../../redux/store";
import { getAllUserComplaints } from "../../../redux/slices/complaint";
import { formatDate } from "utils";


const CitizenDashboard = () => {
  const dispatch = useAppDispatch();
  const { allUserComplaints } = useSelector(
    ({ complaint }: { complaint: any }) => ({
      allUserComplaints: complaint.allUserComplaints,
    })
  );
  useEffect(() => {
    const { userId } = decodeToken();
    if (userId) {
      dispatch(getAllUserComplaints(userId));
    }
  }, []);

  return (
    <CitizenLayout>
      <div className="container mx-auto px-4 py-8">
        <Group justify="space-between" mb="md">
          <Title order={2}>My Complaints</Title>
          <Button color="#006C4A" leftSection={<Plus />}>
            New Complaint
          </Button>
        </Group>

        <SimpleGrid
          cols={{ base: 1, sm: 2, lg: 3 }}
          spacing={{ base: "md", sm: "lg", lg: "xl" }}
        >
          {allUserComplaints.map((ticket:any) => (
            <Card key={ticket.id} shadow="sm" p="lg" radius="md" withBorder>
              <Text size="lg" fw={650} mb="sm">
                {ticket.title}
              </Text>
              <Text size="lg" fw={500} mb="sm">
                {ticket.description}
              </Text>
              <Text c="dimmed" size="sm" mb="xs">
                Status: <span style={{ fontWeight: 500 }}>{ticket.status}</span>
              </Text>
              <Text color="dimmed" size="sm">
                Date: {formatDate(ticket.createdAt)}
              </Text>
            </Card>
          ))}
        </SimpleGrid>
      </div>
    </CitizenLayout>
  );
};

export default CitizenDashboard;
