import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import {
  TextInput,
  Textarea,
  Select,
  Button,
  Group,
  Title,
  Container,
  Card,
  Alert,
} from "@mantine/core";

import CitizenLayout from "../../../../layouts/CitizenLayout";
import { useAppDispatch } from "../../../../redux/store";
import { decodeToken } from "utils/auth";
import { createNewComplaint } from "../../../../redux/slices/complaint";
import { ComplaintDto } from "../../../../types/request/complaint.dto";
import AsyncSelect from "components/ui/Select";

const NewComplaint = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { userId } = decodeToken();

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const form = useForm<ComplaintDto>({
    initialValues: {
      title: "",
      description: "",
      location: "",
      categoryId: "",
      userId: userId || "",
      agencyId:""
    },

    validate: {
      title: (value: any) =>
        value.length < 2 ? "Title must have at least 2 letters" : null,
      description: (value: any) =>
        value.length < 10 ? "Description must have at least 10 letters" : null,
      location: (value: any) =>
        value.length < 3 ? "Location must have at least 3 letters" : null,
      categoryId: (value: any) => (!value ? "Category is required" : null),
      agencyId: (value: any) => (!value ? "Agency is required" : null),
    },
  });

  const handleSubmit = async (values: ComplaintDto) => {
    try {
      await dispatch(createNewComplaint(values));
      setSuccess("Complaint submitted successfully!");
      form.reset();
      setTimeout(() => {
        navigate("/citizen/dashboard");
      }, 2000);
    } catch (error) {
      setError("Failed to submit complaint. Please try again.");
      setTimeout(() => setError(null), 5000);
    }
  };

  return (
    <CitizenLayout>
      <Container size="lg" py="xl">
        <Card shadow="sm" p="lg" radius="md" withBorder>
          <Title order={2} mb="md">
            Submit a New Complaint
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

          <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
            <TextInput
              label="Title"
              placeholder="Enter complaint title"
              {...form.getInputProps("title")}
              required
              mb="md"
            />

            <Textarea
              label="Description"
              placeholder="Describe your complaint in detail"
              {...form.getInputProps("description")}
              required
              mb="md"
              minRows={4}
            />

            <TextInput
              label="Location"
              placeholder="Enter location"
              {...form.getInputProps("location")}
              required
              mb="md"
            />

            <AsyncSelect
            label="Category"
            placeholder="Select category"
            datasrc="/category/all"
            accessorKey="id"
            labelKey="name"
            {...form.getInputProps("categoryId")}
            required

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

            <Group justify="right" mt="md">
              <Button type="submit" color="#006C4A">
                Submit Complaint
              </Button>
            </Group>
          </form>
        </Card>
      </Container>
    </CitizenLayout>
  );
};

export default NewComplaint;
