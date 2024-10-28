export type Capsule = {
  serial: string;
  id: string;
  launchDate: string;
  status: "retired" | "destroyed" | "active" | "unknown";
  type: string;
};
