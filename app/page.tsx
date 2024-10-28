"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CapsuleActionDialog } from "@/components/ui/dialog/capsule-action-dialog";
import { CapsuleInfoDialog } from "@/components/ui/dialog/capsule-info-dialog";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { getStatusBadge } from "@/lib/mock";
import { Badge } from "primereact/badge";
import { Capsule } from "@/types";
import { useCapsules } from "@/hooks/use-capsules";
import { useState } from "react";
import { useFilters } from "@/hooks/use-filters";
import { PaginatorPassThroughMethodOptions } from "primereact/paginator";

const launchDateTemplate = (data: Capsule) => {
  return <h3>{data.launchDate || "NA"}</h3>;
};

const statusBodyTemplate = (rowData: Capsule) => {
  const { severity, value } = getStatusBadge(rowData.status);
  return <Badge value={value} severity={severity} />;
};

export default function Home() {
  const { capsules } = useCapsules();
  const [isEditMode, setIsEditMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [capsuleInfo, setCapsuleInfo] = useState<Capsule | 0>(0);
  const { filterValue, filters, onChange } = useFilters();

  const destroyedCapsulesCount = capsules.filter(
    (capsule) => capsule.status === "destroyed"
  ).length;
  const activeCapsulesCount = capsules.filter(
    (capsule) => capsule.status === "active"
  ).length;
  const totalCapsulesCount = capsules.length;

  const editTemplate = (state: Capsule) => {
    const handleClick = () => {
      setIsModalOpen(true);
      setIsEditMode(true);
      setCapsuleInfo(state);
    };
    return <Button onClick={handleClick}>Edit</Button>;
  };

  return (
    <main className="p-4 md:max-w-[1280px] mx-auto md:pt-8">
      <header className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-medium md:text-3xl">Capsule Corp</h1>
          <p className="text-neutral-700">Manage your capsules.</p>
        </div>
        <Button className="w-fit" onClick={() => setIsModalOpen(true)}>
          <Plus />
          Add Capsule
        </Button>
      </header>
      <CapsuleActionDialog
        isOpen={isModalOpen}
        isEditMode={isEditMode}
        onClose={() => {
          setIsEditMode(false);
          setIsModalOpen(false);
          setCapsuleInfo(0);
        }}
        capsuleInfo={capsuleInfo as Capsule}
      />
      <section className="flex flex-col gap-2 py-5 md:flex-row md:gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Capsules</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-bold text-2xl">{totalCapsulesCount || 0}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Active Capsules</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-bold text-2xl">{activeCapsulesCount || 0}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Destroyed Capsules</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-bold text-2xl">{destroyedCapsulesCount || 0}</p>
          </CardContent>
        </Card>
      </section>
      <section>
        <CapsuleInfoDialog
          isOpen={!!capsuleInfo && !isEditMode}
          capsuleInfo={capsuleInfo as Capsule}
          onClose={() => setCapsuleInfo(0)}
        />
        <header className="flex flox-row gap-2 items-center bg-neutral-50 py-2 px-4 rounded-sm md:max-w-[375px]">
          <Search />
          <Input
            className="border-none bg-transparent ring-0"
            type="text"
            placeholder="Search capsules..."
            onChange={onChange}
            value={filterValue}
          />
        </header>
        {/* data table */}
        <section className="py-4">
          <DataTable
            value={capsules}
            tableStyle={{
              minWidth: "50rem",
            }}
            paginator
            rows={5}
            selectionMode="single"
            onSelectionChange={(e) => setCapsuleInfo(e.value)}
            globalFilterFields={["launchDate", "status", "type"]}
            emptyMessage="No available capsules"
            filters={filters}
            pt={{
              paginator: {
                root: {
                  className: "p-3 gap-4",
                },
                pages: {
                  className: "flex gap-4",
                },
                pageButton: ({
                  context,
                }: PaginatorPassThroughMethodOptions) => {
                  const defaultStyles = "rounded-full p-3 align-items-center";
                  return {
                    className: context.active
                      ? "bg-black text-white " + defaultStyles
                      : "bg-white text-black " + defaultStyles,
                  };
                },
              },
            }}
          >
            <Column
              field="serial"
              header="Capsule ID"
              style={{ width: "20%" }}
            ></Column>
            <Column
              body={(data: Capsule) => launchDateTemplate(data)}
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
            <Column body={editTemplate} style={{ width: "20%" }}></Column>
          </DataTable>
        </section>
      </section>
    </main>
  );
}
