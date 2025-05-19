/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useForm } from "@mantine/form";
import {
  Button,
  Table,
  Modal,
  TextInput,
  Textarea,
  LoadingOverlay,
  Box,
  Title,
  Group,
  ActionIcon,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { Plus, Trash2, Edit, Search } from "lucide-react";
import AdminLayout from "../../../layouts/AdminLayout";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../redux/store";
import {
  createAgency,
  deleteAgency,
  getAgencyById,
  getAllAgencies,
  updateAgency,
} from "../../../redux/slices/agency";
import { showToast } from "utils/notify";
import ToastContainer from "components/molecules/Toast";

const AdminAgencyView = () => {
  const dispatch = useAppDispatch();
  const {
    agencies,
    loading,
    isLoadingCreatingAgency,
    isLoadingUpdatingAgency
  } = useSelector(({ agency }: { agency: any }) => ({
    agencies: agency.agencies,
    loading: agency.loading,
    isLoadingCreatingAgency: agency.isLoadingCreatingAgency,
    isLoadingUpdatingAgency: agency.isLoadingUpdatingAgency
  }));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentAgencyId, setCurrentAgencyId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const form = useForm({
    initialValues: {
      name: "",
      description: "",
      contactEmail: "",
      contactPhone: "",
    },
    validate: {
      name: (value) => (value ? null : "Name is required"),
      contactEmail: (value) =>
        /^\S+@\S+$/.test(value) ? null : "Invalid email",
    },
  });

  useEffect(() => {
    dispatch(getAllAgencies());
  }, [dispatch]);

  const handleSubmitAgency = async (values: any) => {
    try {
      if (isEditMode && currentAgencyId) {
        // Update existing agency
        await dispatch(updateAgency({ id: currentAgencyId,data:{...values} })).unwrap();
        notifications.show({
          title: "Success",
          message: "Agency updated successfully",
          color: "green",
        });
      } else {
        // Create new agency
        await dispatch(createAgency(values)).unwrap();
        notifications.show({
          title: "Success",
          message: "Agency created successfully",
          color: "green",
        });
      }

      setIsModalOpen(false);
      form.reset();
      dispatch(getAllAgencies());
      setIsEditMode(false);
      setCurrentAgencyId(null);
    } catch (error: any) {
      console.error('Error creating agency:', error);
      showToast(
        <ToastContainer title="Error" description="Failed to create agency"/>,
        "error"
      )
    }
  };

  const handleEditAgency = async (id: number, values: any) => {
    try {
      await dispatch(getAgencyById(id));
      setIsEditMode(true);
      setCurrentAgencyId(id);
      form.setValues({
        name: values.name,
        description: values.description,
        contactEmail: values.contactEmail,
        contactPhone: values.contactPhone,
      });
      setIsModalOpen(true);
    } catch (error: any) {
      console.error('Error loading agency:', error);
      showToast(
        <ToastContainer title="Error" description="Failed to load agency data"/>,
        "error"
      )
    }
  };

  const handleDeleteAgency = async (id: number) => {
    try {
      await dispatch(deleteAgency(id)).unwrap();
      notifications.show({
        title: "Success",
        message: "Agency deleted successfully",
        color: "green",
      });
      dispatch(getAllAgencies());
    } catch (error: any) {
      console.error('Error deleting agency:', error);
      showToast(
        <ToastContainer title="Error" description="Failed to delete agency"/>,
        "error"
      )
    }
  };

  const filteredAgencies = agencies.filter(
    (agency: any) =>
      agency.name?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
      agency.email?.toLowerCase().includes(searchQuery?.toLowerCase())
  );

  return (
    <AdminLayout>
      <Box p="md">
        <Group justify="space-between" mb="md">
          <Title order={3}>Agencies</Title>
          <Button
            color={"#006C4A"}
            leftSection={<Plus size={16} />}
            onClick={() => {
              setIsModalOpen(true);
              setIsEditMode(false);
              form.reset();
            }}
          >
            Add New Agency
          </Button>
        </Group>

        <TextInput
          placeholder="Search agencies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          mb="md"
          leftSection={<Search size={16} />}
        />

        <div style={{ position: "relative", minHeight: "200px" }}>
          <LoadingOverlay visible={loading} overlayProps={{ blur: 2 }} />
          <Table
            striped
            highlightOnHover
            withTableBorder
            style={{ width: "100%" }}
          >
            <thead>
              <tr>
                <th style={{ padding: "12px", textAlign: "start" }}>Name</th>
                <th style={{ padding: "12px", textAlign: "start" }}>Email</th>
                <th style={{ padding: "12px", textAlign: "start" }}>Phone</th>
                <th style={{ padding: "12px", textAlign: "start" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAgencies.map((agency: any) => (
                <tr key={agency.id}>
                  <td style={{ padding: "12px", verticalAlign: "middle" }}>
                    {agency.name}
                  </td>
                  <td style={{ padding: "12px", verticalAlign: "middle" }}>
                    {agency.contactEmail || "N/A"}
                  </td>
                  <td style={{ padding: "12px", verticalAlign: "middle" }}>
                    {agency.contactPhone || "N/A"}
                  </td>
                  <td style={{ padding: "12px", verticalAlign: "middle" }}>
                    <Group gap="xs">
                      <ActionIcon
                        onClick={() => handleEditAgency(agency.id, agency)}
                        color="blue"
                        variant="light"
                      >
                        <Edit size={16} />
                      </ActionIcon>
                      <ActionIcon
                        onClick={() => handleDeleteAgency(agency.id)}
                        color="red"
                        variant="light"
                      >
                        <Trash2 size={16} />
                      </ActionIcon>
                    </Group>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        <Modal
          opened={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setIsEditMode(false);
            setCurrentAgencyId(null);
            form.reset();
          }}
          title={isEditMode ? "Update Agency" : "Create New Agency"}
        >
          <form onSubmit={form.onSubmit(handleSubmitAgency)}>
            <TextInput
              label="Name"
              placeholder="Enter agency name"
              required
              mb="md"
              {...form.getInputProps("name")}
            />
            <TextInput
              label="Email"
              placeholder="Enter email"
              type="email"
              required
              mb="md"
              {...form.getInputProps("contactEmail")}
            />
            <TextInput
              label="Phone"
              placeholder="Enter phone number"
              mb="md"
              {...form.getInputProps("contactPhone")}
            />
            <Textarea
              label="Description"
              placeholder="Enter description"
              mb="md"
              {...form.getInputProps("description")}
            />
            <Group justify="right" mt="md">
              <Button
                variant="default"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                color="#006C4A"
                type="submit"
                loading={isLoadingCreatingAgency || isLoadingUpdatingAgency}
              >
                {isEditMode ? 'Update' : 'Create'}
              </Button>
            </Group>
          </form>
        </Modal>


      </Box>
    </AdminLayout>
  );
};

export default AdminAgencyView;
