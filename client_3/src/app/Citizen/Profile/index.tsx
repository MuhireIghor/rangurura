/* eslint-disable @typescript-eslint/no-explicit-any */
import { Paper, Text, Grid, Group, Skeleton } from "@mantine/core";
import { Mail, Phone, Building2, User } from "lucide-react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../redux/store";
import { decodeToken } from "utils/auth";
import CitizenLayout from "../../../layouts/CitizenLayout";
import { getUserProfile } from "../../../redux/slices/auth";

const ProfileSkeleton = () => (
  <div className="flex flex-col md:flex-row items-start gap-6">
    <Skeleton circle height={160} className="-mt-8" />
    <div className="flex-1 w-full mt-4 md:mt-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="w-full md:w-64">
          <Skeleton height={28} width="80%" mb={8} />
          <Skeleton height={20} width="40%" />
        </div>
      </div>
      <Grid mt={30} gutter="xl">
        {[...Array(4)].map((_, i) => (
          <Grid.Col key={i} span={{ base: 12, md: 6 }}>
            <div className="p-3 rounded-lg bg-saturate-white">
              <Group>
                <Skeleton circle height={40} />
                <div className="flex-1">
                  <Skeleton height={16} width="30%" mb={8} />
                  <Skeleton height={16} width="60%" />
                </div>
              </Group>
            </div>
          </Grid.Col>
        ))}
      </Grid>
    </div>
  </div>
);

const Profile = () => {
  const { profile, isLoading } = useSelector(({ auth }: { auth: any }) => ({
    profile: auth.profile,
    isLoading: auth.isLoading
  }));
  const dispatch = useAppDispatch();

  useEffect(() => {
    const data = decodeToken();
    if (data) {
      dispatch(getUserProfile(data.email));
    }
  }, []);

  return (
    <CitizenLayout>
      <div className="bg-dark-white p-6">
        <div className="max-w-4xl mx-auto">
          <Paper shadow="sm" radius="lg" className="bg-white overflow-hidden">
            {/* Header Background */}
            <div className="h-32 bg-primary"></div>

            {/* Profile Content */}
            <div className="px-8 pb-8 -mt-16">
              {isLoading ? (
                <ProfileSkeleton />
              ) : (
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <img
                    className="rounded-full w-40 h-40 object-cover -mt-8 border-4 border-white shadow-lg"
                    src={`https://ui-avatars.com/api/?name=${profile?.name}&bold=true&background=006C4A&color=fff`}
                    alt={`${profile?.name} 's avatar`}
                  />

                  {/* Info Section */}
                  <div className="flex-1 w-full mt-4 md:mt-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div>
                        <Text size="xl" fw={600} style={{color:'white'}}>
                          {profile?.name}
                        </Text>
                        <Text size="sm" className="text-secondary mt-1">
                          {profile?.role}
                        </Text>
                      </div>
                    </div>

                    {/* Contact Grid */}
                    <Grid mt={30} gutter="xl">
                      <Grid.Col span={{ base: 12, md: 6 }}>
                        <Group className="p-3 rounded-lg bg-saturate-white hover:bg-primary/5 transition-colors">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Mail size={20} className="text-primary" />
                          </div>
                          <div>
                            <Text size="sm" c="dimmed">
                              Email
                            </Text>
                            <Text size="sm" className="text-black font-medium">
                              {profile?.email}
                            </Text>
                          </div>
                        </Group>
                      </Grid.Col>
                      <Grid.Col span={{ base: 12, md: 6 }}>
                        <Group className="p-3 rounded-lg bg-saturate-white hover:bg-primary/5 transition-colors">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Phone size={20} className="text-primary" />
                          </div>
                          <div>
                            <Text size="sm" c="dimmed">
                              Phone
                            </Text>
                            <Text size="sm" className="text-black font-medium">
                              {profile?.phoneNumber}
                            </Text>
                          </div>
                        </Group>
                      </Grid.Col>
                      <Grid.Col span={{ base: 12, md: 6 }}>
                        <Group className="p-3 rounded-lg bg-saturate-white hover:bg-primary/5 transition-colors">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Building2 size={20} className="text-primary" />
                          </div>
                          <div>
                            <Text size="sm" c="dimmed">
                              Organization
                            </Text>
                            <Text size="sm" className="text-black font-medium">
                              REMA
                            </Text>
                          </div>
                        </Group>
                      </Grid.Col>
                      {/* <Grid.Col span={{ base: 12, md: 6 }}>
                        <Group className="p-3 rounded-lg bg-saturate-white hover:bg-primary/5 transition-colors">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <User size={20} className="text-primary" />
                          </div>
                          <div>
                            <Text size="sm" c="dimmed">
                              Employee ID
                            </Text>
                            <Text size="sm" className="text-black font-medium">
                                {p}
                            </Text>
                          </div>
                        </Group>
                      </Grid.Col> */}
                    </Grid>
                  </div>
                </div>
              )}
            </div>
          </Paper>
        </div>
      </div>
    </CitizenLayout>
  );
};

export default Profile;
