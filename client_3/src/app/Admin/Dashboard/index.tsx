import { useState } from 'react';
import AdminLayout from "../../../layouts/AdminLayout";
import { Card, Title, Text, Group, Badge, Grid, Container, ThemeIcon, Progress, Flex, Stack } from '@mantine/core';
import { AlertCircle, Users, Building, Check } from 'lucide-react';

interface AnalyticsData {
  totalComplaints: number;
  totalUsers: number;
  totalAgencies: number;
  complaintsByCategory: {
    [key: string]: number;
  };
  complaintsByStatus: {
    [key: string]: number;
  };
}

const AdminDashboard = () => {
  // State variables for filtering (to be implemented)
  // State variables for filtering (to be implemented)
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTimeRange, setSelectedTimeRange] = useState('week');

  // TODO: Implement API calls to fetch real analytics data
  // Mock analytics data - replace with actual API calls

  // Mock analytics data - replace with actual API calls
  const analyticsData: AnalyticsData = {
    totalComplaints: 1250,
    totalUsers: 4500,
    totalAgencies: 120,
    complaintsByCategory: {
      'Infrastructure': 350,
      'Services': 420,
      'Safety': 280,
      'Environment': 200,
      'Others': 150,
    },
    complaintsByStatus: {
      'Pending': 300,
      'In Progress': 450,
      'Resolved': 400,
      'Escalated': 100,
    },
  };

  const statusColors = {
    'Pending': 'blue',
    'In Progress': 'yellow',
    'Resolved': 'green',
    'Escalated': 'red',
  };

  return (
    <AdminLayout>
      <Container size="lg" py="xl">
        <Grid gutter="xl">
          {/* Overview Cards */}
          <Grid.Col span={4}>
            <Card shadow="sm" p="lg" radius="md" withBorder>
              <Group justify="space-between" mb="sm">
                <Group>
                  <ThemeIcon size={40} radius="xl" color="blue">
                    <AlertCircle size={20} />
                  </ThemeIcon>
                  <div>
                    <Text size="xs" color="dimmed">
                      Total Complaints
                    </Text>
                    <Title order={2}>{analyticsData.totalComplaints}</Title>
                  </div>
                </Group>
                <Badge color="blue" variant="light">
                  +12% <span style={{ fontSize: '0.75rem' }}>from last month</span>
                </Badge>
              </Group>
            </Card>
          </Grid.Col>

          <Grid.Col span={4}>
            <Card shadow="sm" p="lg" radius="md" withBorder>
              <Group justify="space-between" mb="sm">
                <Group>
                  <ThemeIcon size={40} radius="xl" color="green">
                    <Users size={20} />
                  </ThemeIcon>
                  <div>
                    <Text size="xs" color="dimmed">
                      Total Users
                    </Text>
                    <Title order={2}>{analyticsData.totalUsers}</Title>
                  </div>
                </Group>
                <Badge color="green" variant="light">
                  +8% <span style={{ fontSize: '0.75rem' }}>from last month</span>
                </Badge>
              </Group>
            </Card>
          </Grid.Col>

          <Grid.Col span={4}>
            <Card shadow="sm" p="lg" radius="md" withBorder>
              <Group justify="space-between" mb="sm">
                <Group>
                  <ThemeIcon size={40} radius="xl" color="purple">
                    <Building size={20} />
                  </ThemeIcon>
                  <div>
                    <Text size="xs" color="dimmed">
                      Total Agencies
                    </Text>
                    <Title order={2}>{analyticsData.totalAgencies}</Title>
                  </div>
                </Group>
                <Badge color="purple" variant="light">
                  +5% <span style={{ fontSize: '0.75rem' }}>from last month</span>
                </Badge>
              </Group>
            </Card>
          </Grid.Col>

          {/* Complaints by Status */}
          <Grid.Col span={12}>
            <Card shadow="sm" p="lg" radius="md" withBorder>
              <Title order={3} mb="md">Complaints by Status</Title>
              <Flex gap="md" justify="space-between">
                {Object.entries(analyticsData.complaintsByStatus).map(([status, count]) => (
                  <Stack key={status} style={{ flex: 1 }} gap="xs">
                    <Progress
                      value={(count / analyticsData.totalComplaints) * 100}
                      color={statusColors[status as keyof typeof statusColors]}
                      size="xs"
                    />
                  </Stack>
                ))}
              </Flex>
            </Card>
          </Grid.Col>

          {/* Complaints by Category */}
          <Grid.Col span={12}>
            <Card shadow="sm" p="lg" radius="md" withBorder>
              <Title order={3} mb="md">Complaints by Category</Title>
              <Grid gutter="md">
                {Object.entries(analyticsData.complaintsByCategory).map(([category, count]) => (
                  <Grid.Col span={4} key={category}>
                    <Card shadow="sm" p="lg" radius="md" withBorder>
                      <Stack gap="xs">
                        <Group justify="space-between" mb="xs">
                          <Group>
                            <ThemeIcon size={24} radius="xl" color="blue">
                              <Check size={16} />
                            </ThemeIcon>
                            <div>
                              <Text size="sm">
                                {category}
                              </Text>
                              <Text size="xs" color="dimmed">
                                {Math.round((count / analyticsData.totalComplaints) * 100)}%
                              </Text>
                            </div>
                          </Group>
                          <Text size="sm" color="blue">
                            {count}
                          </Text>
                        </Group>
                        <Progress
                          value={(count / analyticsData.totalComplaints) * 100}
                          color="blue"
                          size="xs"
                        />
                      </Stack>
                    </Card>
                  </Grid.Col>
                ))}
              </Grid>
            </Card>
          </Grid.Col>
        </Grid>
      </Container>
    </AdminLayout>
  );
};

export default AdminDashboard;