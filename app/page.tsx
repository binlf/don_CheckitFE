"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AddCapsuleDialog } from "@/components/ui/dialog/add-capsule-dialog";
import { CapsuleInfoDialog } from "@/components/ui/dialog/capsule-info-dialog";
import { EditCapsuleDialog } from "@/components/ui/dialog/edit-capsule-dialog";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { capsules, getStatusBadge } from "@/lib/mock";
import { Badge } from "primereact/badge";

const editTemplate = (data) => <Button>Edit</Button>;
const statusBodyTemplate = (rowData: Capsule) => {
  const { severity, value } = getStatusBadge(rowData.status);
  return <Badge value={value} severity={severity} />;
};

export default function Home() {
  return (
    <main className="p-4 md:max-w-[1280px] mx-auto md:pt-8">
      <header className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-medium md:text-3xl">Capsule Corp</h1>
          <p className="text-neutral-700">Manage your capsules.</p>
        </div>
        <AddCapsuleDialog>
          <Button className="w-fit">
            <Plus />
            Add Capsule
          </Button>
        </AddCapsuleDialog>
      </header>
      <section className="flex flex-col gap-2 py-5 md:flex-row md:gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Capsules</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-bold text-2xl">2100</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Active Capsules</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-bold text-2xl">2100</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Destroyed Capsules</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-bold text-2xl">2100</p>
          </CardContent>
        </Card>
      </section>
      <section>
        <CapsuleInfoDialog />
        <EditCapsuleDialog />
        <header className="flex flox-row gap-2 items-center bg-neutral-50 py-2 px-4 rounded-sm md:max-w-[375px]">
          <Search />
          <Input
            className="border-none bg-transparent ring-0"
            type="text"
            placeholder="Search capsules..."
          />
        </header>
        {/* data table */}
        <section className="py-4">
          <DataTable
            value={capsules}
            tableStyle={{
              minWidth: "50rem",
            }}
          >
            <Column
              field="id"
              header="Capsule ID"
              style={{ width: "20%" }}
            ></Column>
            <Column
              field="launchDate"
              header="Launch Date"
              style={{ width: "20%" }}
            ></Column>
            <Column
              field="status"
              header="Status"
              style={{ width: "20%" }}
              body={statusBodyTemplate}
            ></Column>
            <Column
              field="type"
              header="Type"
              style={{ width: "20%" }}
            ></Column>
            <Column
              body={editTemplate}
              // field="quantity"
              // header="Type"
              style={{ width: "20%" }}
            ></Column>
          </DataTable>
        </section>
      </section>
    </main>
  );
}

// TODO
// Table Columns:
// capsule id, launch date, type, status
// form entries
// launch date, capsule id, status, type
