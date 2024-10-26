// types/capsule.ts
export interface Capsule {
  id: string; // Capsule ID
  launchDate: string; // Launch Date
  status: "active" | "retired" | "destroyed" | "unknown";
  type: "Dragon 1.0" | "Dragon 1.1" | "Dragon 2.0" | "Crew Dragon";
}

// mock/capsuleData.ts
export const capsules: Capsule[] = [
  {
    id: "C201",
    launchDate: "2024-01-15",
    status: "active",
    type: "Dragon 2.0",
  },
  {
    id: "C202",
    launchDate: "2023-11-28",
    status: "active",
    type: "Crew Dragon",
  },
  {
    id: "C103",
    launchDate: "2023-08-07",
    status: "retired",
    type: "Dragon 1.1",
  },
  {
    id: "C204",
    launchDate: "2024-02-01",
    status: "active",
    type: "Dragon 2.0",
  },
  {
    id: "C102",
    launchDate: "2022-12-15",
    status: "destroyed",
    type: "Dragon 1.0",
  },
  {
    id: "C205",
    launchDate: "2023-09-30",
    status: "active",
    type: "Crew Dragon",
  },
  {
    id: "C206",
    launchDate: "2024-03-01",
    status: "unknown",
    type: "Dragon 2.0",
  },
  {
    id: "C104",
    launchDate: "2023-05-20",
    status: "retired",
    type: "Dragon 1.1",
  },
  {
    id: "C207",
    launchDate: "2023-10-12",
    status: "active",
    type: "Crew Dragon",
  },
  {
    id: "C208",
    launchDate: "2024-02-15",
    status: "active",
    type: "Dragon 2.0",
  },
];

// Optional: Status badge template for PrimeReact DataTable
export const getStatusBadge = (status: Capsule["status"]) => {
  const severityMap: Record<
    Capsule["status"],
    "success" | "warning" | "danger" | "info"
  > = {
    active: "success",
    retired: "warning",
    destroyed: "danger",
    unknown: "info",
  };

  return {
    severity: severityMap[status],
    value: status.charAt(0).toUpperCase() + status.slice(1),
  };
};
