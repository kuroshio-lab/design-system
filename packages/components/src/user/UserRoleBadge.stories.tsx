import type { Meta, StoryObj } from "@storybook/react";
import UserRoleBadge from "./UserRoleBadge";
import type { User } from "./UserProvider";

const meta: Meta<typeof UserRoleBadge> = {
  title: "Components/UserRoleBadge",
  component: UserRoleBadge,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "ocean-dark",
      values: [
        { name: "ocean-dark", value: "#003A63" },
        { name: "light", value: "#ffffff" },
      ],
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const hobbyistUser: User = {
  id: 1,
  username: "oceanwatcher",
  email: "watcher@example.com",
  role: "hobbyist",
  firstName: "Ocean",
  lastName: "Watcher",
};

const pendingResearcher: User = {
  id: 2,
  username: "aspiring_researcher",
  email: "aspiring@example.com",
  role: "researcher_pending",
  firstName: "Aspiring",
  lastName: "Researcher",
};

const communityResearcher: User = {
  id: 3,
  username: "verified_researcher",
  email: "verified@example.com",
  role: "researcher_community",
  firstName: "Verified",
  lastName: "Researcher",
};

const institutionalResearcher: User = {
  id: 4,
  username: "institutional_researcher",
  email: "institutional@example.com",
  role: "researcher_institutional",
  firstName: "Institutional",
  lastName: "Researcher",
  institution: "Marine Research Institute",
};

export const Hobbyist: Story = {
  args: {
    user: hobbyistUser,
    variant: "full",
  },
};

export const ResearcherPending: Story = {
  args: {
    user: pendingResearcher,
    variant: "full",
  },
};

export const CommunityResearcher: Story = {
  args: {
    user: communityResearcher,
    variant: "full",
  },
};

export const InstitutionalResearcher: Story = {
  args: {
    user: institutionalResearcher,
    variant: "full",
  },
};

export const CompactAllRoles: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap justify-center">
      <UserRoleBadge user={hobbyistUser} variant="compact" />
      <UserRoleBadge user={pendingResearcher} variant="compact" />
      <UserRoleBadge user={communityResearcher} variant="compact" />
      <UserRoleBadge user={institutionalResearcher} variant="compact" />
    </div>
  ),
};
