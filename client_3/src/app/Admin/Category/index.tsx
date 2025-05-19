/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/Admin/Category/index.tsx
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
  Title,
  Group,
  ActionIcon,
  Text,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { Plus, Trash2, Edit } from "lucide-react";

import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../redux/store";
import {
  createCategory,
  deleteCategoryId,
  getAllCategories,
  updateCategory,
} from "../../../redux/slices/category";
import AsyncSelect from "components/ui/Select";
import AdminLayout from "../../../layouts/AdminLayout";
import ToastContainer from "components/molecules/Toast";
import { showToast } from "utils/notify";

const CategoryView = () => {
  const dispatch = useAppDispatch();
  const {
    status,
    isLoading,
    error,
    categories,
    isLoadingCreatingCategory,
    errorCreatingCategory,
    isLoadingGettingCategoryById,
    errorGettingCategoryById,
    category,
    isLoadingUpdatingCategory,
    errorUpdatingCategory,
    isLoadingDeletingCategory,
    errorDeletingCategory,
  } = useSelector(({ category }: { category: any }) => ({
    status: category.status,
    isLoading: category.isLoading,
    error: category.error,
    categories: category.categories,
    isLoadingCreatingCategory: category.isLoadingCreatingCategory,
    errorCreatingCategory: category.errorCreatingCategory,
    isLoadingGettingCategoryById: category.isLoadingGettingCategoryById,
    errorGettingCategoryById: category.errorGettingCategoryById,
    category: category.category,
    isLoadingUpdatingCategory: category.isLoadingUpdatingCategory,
    errorUpdatingCategory: category.errorUpdatingCategory,
    isLoadingDeletingCategory: category.isLoadingDeletingCategory,
    errorDeletingCategory: category.errorDeletingCategory,
  }));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentCategoryId, setCurrentCategoryId] = useState<string | null>(
    null
  );

  const form = useForm({
    initialValues: {
      name: "",
      description: "",
      agencyId: "",
    },
    validate: {
      name: (value) => (!value ? "Name is required" : null),
    },
  });

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  const handleSubmit = async (values: {
    name: string;
    description: string;
  }) => {
    try {
      if (isEditMode && currentCategoryId) {
        await dispatch(
          updateCategory({ id: currentCategoryId, data: { ...values } })
        ).unwrap();
        notifications.show({
          title: "Success",
          message: "Category updated successfully",
          color: "green",
        });
      } else {
        await dispatch(createCategory(values)).unwrap();
        notifications.show({
          title: "Success",
          message: "Category created successfully",
          color: "green",
        });
      }
      handleCloseModal();
    } catch (error: any) {
      console.error('Error updating category:', error);
      showToast(
        <ToastContainer title="Error" description="Failed to update category"/>,
        "error"
      )
    } finally {
      dispatch(getAllCategories());
    }
  };

  const handleEdit = (category: any) => {
    form.setValues({
      name: category.name,
      description: category.description || "",
      agencyId: category.agencyId,
    });
    setCurrentCategoryId(category.id);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await dispatch(deleteCategoryId(id)).unwrap();
        notifications.show({
          title: "Success",
          message: "Category deleted successfully",
          color: "green",
        });
      } catch (error: any) {
        console.error('Error deleting category:', error);
        showToast(
          <ToastContainer title="Error" description="Failed to delete category"/>,
          "error"
        )
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setCurrentCategoryId(null);
    form.reset();
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <Title order={2}>Categories</Title>
          <Button
            color="#006C4A"
            leftSection={<Plus size={16} />}
            onClick={() => setIsModalOpen(true)}
          >
            Add Category
          </Button>
        </div>

        <div className="relative">
          <LoadingOverlay visible={isLoading} />

          <Table striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Name</Table.Th>
                <Table.Th>Description</Table.Th>
                <Table.Th>Agency</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {isLoading ? (
                <Table.Tr>
                  <Table.Td colSpan={5}>
                    <LoadingOverlay visible={isLoading} />
                  </Table.Td>
                </Table.Tr>
              ) : categories.length > 0 ? (
                categories?.map((category: any) => (
                  <Table.Tr key={category.id}>
                    <Table.Td>{category.name}</Table.Td>
                    <Table.Td>
                      <Text lineClamp={2}>
                        {category.description || "No description"}
                      </Text>
                    </Table.Td>
                    <Table.Td>
                      <Text lineClamp={2}>
                        {category.agency.name || "No agency"}
                      </Text>
                    </Table.Td>
                    <Table.Td>
                      <Group gap="xs">
                        <ActionIcon
                          variant="subtle"
                          color="#006C4A"
                          onClick={() => handleEdit(category)}
                        >
                          <Edit size={16} />
                        </ActionIcon>
                        <ActionIcon
                          variant="subtle"
                          color="red"
                          onClick={() => handleDelete(category.id)}
                        >
                          <Trash2 size={16} />
                        </ActionIcon>
                      </Group>
                    </Table.Td>
                  </Table.Tr>
                ))
              ) : (
                <Table.Tr>
                  <Table.Td colSpan={5}>
                    <Text align="center">No categories found</Text>
                  </Table.Td>
                </Table.Tr>
              )}
            </Table.Tbody>
          </Table>
        </div>

        <Modal
          opened={isModalOpen}
          onClose={handleCloseModal}
          title={isEditMode ? "Edit Category" : "Add New Category"}
        >
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
              label="Name"
              placeholder="Enter category name"
              required
              {...form.getInputProps("name")}
              className="mb-4"
            />
            <Textarea
              label="Description"
              placeholder="Enter category description"
              {...form.getInputProps("description")}
              className="mb-6"
            />
            <AsyncSelect
              label="Agency"
              placeholder="Select agency"
              datasrc="/agency"
              accessorKey="id"
              labelKey="name"
              {...form.getInputProps("agencyId")}
              required
            />
            <Group justify="flex-end">
              <Button
                variant="default"
                disabled={isLoading}
                onClick={handleCloseModal}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                color="#006C4A"
                loading={isLoadingCreatingCategory || isLoadingUpdatingCategory}
                disabled={
                  isLoadingCreatingCategory || isLoadingUpdatingCategory
                }
              >
                {isEditMode ? "Update" : "Create"}
              </Button>
            </Group>
          </form>
        </Modal>
      </div>
    </AdminLayout>
  );
};

export default CategoryView;
