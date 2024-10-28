import { FilterMatchMode } from "primereact/api";
import { DataTableFilterMeta } from "primereact/datatable";
import { useState } from "react";

export const useFilters = () => {
  const [filters, setFilters] = useState<DataTableFilterMeta>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let _filters = { ...filters };
    // @ts-ignore
    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  return {
    onChange: onGlobalFilterChange,
    filters,
    filterValue: globalFilterValue,
  };
};
