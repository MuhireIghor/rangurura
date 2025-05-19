/* eslint-disable @typescript-eslint/no-explicit-any */
import AdminLayout from "../../../layouts/AdminLayout";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Table,
  Button,
  Text,
  Title,
  Group,
  Badge,
  ActionIcon,
  Modal,
  TextInput,
  Select,
  Stack,
  Paper,
  Avatar,
  LoadingOverlay,
  Box,
} from "@mantine/core";
import {
  Plus,
  Pencil,
  Trash,
  UserPlus,
  UserCheck,
  Building2,
  Mail,
  Phone,
  User as UserIcon,
} from "lucide-react";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { getAllUsers, signupAgencyUser } from "../../../redux/slices/auth";
import AsyncSelect from "components/ui/Select";
import { useAppDispatch } from "../../../redux/store";
import { decodeToken } from "utils/auth";
import { showToast } from "utils/notify";
import ToastContainer from "components/molecules/Toast";

type User = {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
  agencyId?: number;
  agency?: {
    name: string;
  };
  isActive: boolean;
  createdAt: string;
};

type NewUserFormValues = {
  name: string;
  email: string;
  phoneNumber: string;
  role: "CITIZEN" | "AGENCY_STAFF" | "ADMIN";
  agencyId?: number;
  password: string;
  confirmPassword: string;
  position?: string;
  userId?: number;
};

const UsersViewByAdmin = () => {
  const { userId } = decodeToken();
  const dispatch = useAppDispatch();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Get users from Redux store
  const { allUsers, loadingAllUsers } = useSelector(
    ({ auth }: { auth: any }) => ({
      allUsers: auth.allUsers || [],
      loadingAllUsers: auth.loadingAllUsers,
    })
  );

  useEffect(() => {
    dispatch(getAllUsers() as any);
  }, []);

  // Form setup for creating new user
  const form = useForm<NewUserFormValues>({
    initialValues: {
      name: "",
      email: "",
      phoneNumber: "",
      role: "CITIZEN",
      agencyId: 0,
      password: "",
      confirmPassword: "",
      position: undefined,
      userId,
    },
    validate: {
      name: (value) =>
        value.trim().length < 2 ? "Name must have at least 2 letters" : null,
      email: (value) => (/^\S+@\S+\.\S+$/.test(value) ? null : "Invalid email"),
      phoneNumber: (value) =>
        value.trim().length < 10 ? "Invalid phone number" : null,
      role: (value) =>
        ["ADMIN", "AGENCY_STAFF", "CITIZEN"].includes(value)
          ? null
          : "Invalid role",
      password: (value, values) => {
        if (value.length < 8)
          return "Password must be at least 8 characters long";
        if (value !== values.confirmPassword) return "Passwords do not match";
        return null;
      },
      confirmPassword: (value, values) =>
        value !== values.password ? "Passwords do not match" : null,
    },
  });

  // Fetch users on component mount
  useEffect(() => {
    dispatch(getAllUsers() as any);
  }, [dispatch]);

  const handleCreateUser = async (values: NewUserFormValues) => {
    if (values.role === "AGENCY_STAFF" && !values.agencyId) {
      form.setFieldError("agencyId", "Agency is required for staff members");
      return;
    }

    setIsLoading(true);
    try {
      const userData = {
        name: values.name,
        email: values.email,
        phone: values.phoneNumber,
        password: values.password,
        confirmPassword: values.password,
        agencyId: parseInt(values.agencyId as unknown as string),
        position: values.role === "AGENCY_STAFF" ? "AGENCY_STAFF" : "CITIZEN",
        userId: parseInt(values.userId as unknown as string),
      };

      dispatch(signupAgencyUser(userData) as any);

      notifications.show({
        title: "Success",
        message: "User created successfully",
        color: "green",
      });

      dispatch(getAllUsers() as any);
      setIsCreateModalOpen(false);
      form.reset();
    } catch (error: any) {
      console.error('Error creating user:', error);
      showToast(
        <ToastContainer title="Error" description="Failed to create user"/>,
        "error"
      )
    } finally {
      setIsLoading(false);
    }
  };

  const getRoleBadge = (role: string) => {
    const roleConfig = {
      ADMIN: { color: "violet", icon: <UserCheck size={14} /> },
      AGENCY_STAFF: { color: "green", icon: <Building2 size={14} /> },
      USER: { color: "gray", icon: <UserIcon size={14} /> },
    }[role] || { color: "gray", icon: <UserIcon size={14} /> };

    return (
      <Badge
        leftSection={roleConfig.icon}
        color={roleConfig.color}
        variant="light"
      >
        {role.replace("_", " ")}
      </Badge>
    );
  };
  return (
    <AdminLayout>
      <Box pos="relative">
        <LoadingOverlay visible={loadingAllUsers} />

        <Group justify="space-between" mb="md">
          <div>
            <Title order={2} mb={4}>
              User Management
            </Title>
            <Text color="dimmed" size="sm">
              Manage all users in the system
            </Text>
          </div>
          <Button
            color="#006C4A"
            leftSection={<Plus size={18} />}
            onClick={() => setIsCreateModalOpen(true)}
          >
            Add User
          </Button>
        </Group>

        <Paper withBorder radius="md" p="md">
          <Table highlightOnHover>
            <thead>
              <tr>
                <th>User</th>
                <th>Contact</th>
                <th>Role</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.map((user: User) => (
                <tr key={user.id}>
                  <td>
                    <Group gap="sm">
                      <Avatar size={40} radius="xl" color="green">
                        {user.name.charAt(0).toUpperCase()}
                      </Avatar>
                      <div>
                        <Text fw={500}>{user.name}</Text>
                      </div>
                    </Group>
                  </td>
                  <td>
                    <Text size="sm">
                      <Group gap={5}>
                        <Mail size={14} />
                        {user.email}
                      </Group>
                    </Text>
                    {user.phoneNumber && (
                      <Text size="xs" color="dimmed">
                        <Group gap={5}>
                          <Phone size={14} />
                          {user.phoneNumber}
                        </Group>
                      </Text>
                    )}
                  </td>
                  <td>{getRoleBadge(user.role)}</td>
                  <td>
                    <Text size="sm">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </Text>
                    <Text size="xs" color="dimmed">
                      {new Date(user.createdAt).toLocaleTimeString()}
                    </Text>
                  </td>
                  <td>
                    <Group gap={5}>
                      <ActionIcon color="green" variant="light">
                        <Pencil size={16} />
                      </ActionIcon>
                      <ActionIcon color="red" variant="light">
                        <Trash size={16} />
                      </ActionIcon>
                    </Group>
                  </td>
                </tr>
              ))}

              {allUsers.length === 0 && !loadingAllUsers && (
                <tr>
                  <td
                    colSpan={6}
                    style={{ textAlign: "center", padding: "20px" }}
                  >
                    <Text color="dimmed">No users found</Text>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Paper>
      </Box>

      {/* Create User Modal */}
      <Modal
        opened={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          form.reset();
        }}
        title="Create New User"
        size="lg"
      >
        <form onSubmit={form.onSubmit(handleCreateUser)}>
          <Stack gap="md">
            <TextInput
              label="Full Name"
              placeholder="Enter full name"
              required
              {...form.getInputProps("name")}
              leftSection={<UserIcon size={16} />}
            />

            <TextInput
              label="Email Address"
              placeholder="Enter email"
              required
              type="email"
              {...form.getInputProps("email")}
              leftSection={<Mail size={16} />}
            />

            <TextInput
              label="Phone Number"
              placeholder="Enter phone number"
              {...form.getInputProps("phoneNumber")}
              leftSection={<Phone size={16} />}
            />

            <Select
              label="Role"
              placeholder="Select role"
              required
              data={[
                { value: "CITIZEN", label: "Regular User" },
                { value: "AGENCY_STAFF", label: "Agency Staff" },
                { value: "ADMIN", label: "Administrator" },
              ]}
              {...form.getInputProps("role")}
            />

            {form.values.role === "AGENCY_STAFF" && (
              <AsyncSelect
                label="Agency"
                placeholder="Select agency"
                datasrc="/agency"
                accessorKey="id"
                labelKey="name"
                {...form.getInputProps("agencyId")}
                required
              />
            )}

            <TextInput
              label="Password"
              type="password"
              required
              placeholder="Enter password"
              {...form.getInputProps("password")}
            />

            <TextInput
              label="Confirm Password"
              type="password"
              required
              placeholder="Confirm password"
              {...form.getInputProps("confirmPassword")}
            />

            <Group justify="right" mt="md">
              <Button
                variant="default"
                onClick={() => {
                  setIsCreateModalOpen(false);
                  form.reset();
                }}
              >
                Cancel
              </Button>
              <Button
                color="#006C4A"
                type="submit"
                loading={isLoading}
                leftSection={<UserPlus size={16} />}
              >
                Create User
              </Button>
            </Group>
          </Stack>
        </form>
      </Modal>
    </AdminLayout>
  );
};

export default UsersViewByAdmin;
