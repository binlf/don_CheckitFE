/* eslint-disable */

import React, { PropsWithChildren, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { CalendarIcon, X } from "lucide-react";
import { useFormik } from "formik";
import { capsuleSchema } from "@/lib/utils";
import { Capsule } from "@/types";
import { useDispatch } from "react-redux";
import { format } from "date-fns";
import { addCapsule, updateCapsule } from "@/stores/slices/capsules-slice";

type CapsuleActionDialogProps = {
  isEditMode: boolean;
  isOpen: boolean;
  onClose: () => void;
  capsuleInfo: Capsule;
} & PropsWithChildren;

export const CapsuleActionDialog = ({
  children,
  isOpen,
  onClose,
  isEditMode,
  capsuleInfo,
}: CapsuleActionDialogProps) => {
  return (
    <Dialog open={isOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent onPointerDownOutside={onClose}>
        <DialogClose onClick={onClose}>
          <X />
        </DialogClose>
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit Capsule" : "Add Capsule"}
          </DialogTitle>
          <DialogDescription>
            {isEditMode ? "Edit a Capsule Entry" : "Add a new capsule entry"}
          </DialogDescription>
        </DialogHeader>
        <CapsuleActionForm
          capsuleInfo={capsuleInfo}
          isEditMode={isEditMode}
          onClose={onClose}
        />
      </DialogContent>
    </Dialog>
  );
};

type CapsuleActionFormProps = {
  isEditMode: boolean;
  onClose: () => void;
  capsuleInfo: Capsule;
};

const CapsuleActionForm = ({
  isEditMode,
  onClose,
  capsuleInfo,
}: CapsuleActionFormProps) => {
  const dispatch = useDispatch();
  const {
    handleChange,
    values,
    setValues,
    setFieldValue,
    errors,
    touched,
    handleSubmit,
  } = useFormik<Capsule>({
    initialValues: {
      id: "",
      serial: "",
      launchDate: "",
      status: "unknown",
      type: "",
    },
    validationSchema: capsuleSchema,
    onSubmit(values) {
      if (isEditMode) {
        dispatch(updateCapsule(values));
      } else dispatch(addCapsule(values));
      onClose();
    },
  });

  useEffect(() => {
    if (isEditMode) {
      setValues(capsuleInfo);
    }
  }, []);

  const selectedDate = values.launchDate;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <fieldset className="flex-col gap-2">
        <Label htmlFor="serial">Capsule ID:</Label>
        <Input
          type="text"
          id="serial"
          placeholder="xxxxxxxxxx"
          value={values.serial}
          onChange={handleChange}
        />
        {errors.serial && touched.serial && (
          <small className="text-red-500">{errors.serial}</small>
        )}
      </fieldset>
      <fieldset className="flex-col gap-2">
        <Label htmlFor="type">Type:</Label>
        <Input
          type="text"
          id="type"
          placeholder="Dragon 1.x"
          value={values.type}
          onChange={handleChange}
        />
        {errors.type && touched.type && (
          <small className="text-red-500">{errors.type}</small>
        )}
      </fieldset>
      <fieldset className="flex-col gap-2">
        <Label>Status:</Label>
        <Select
          value={values.status}
          onValueChange={(value) => {
            value && setFieldValue("status", value);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Status" defaultValue={values.status} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="unknown">Unknown</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="retired">Retired</SelectItem>
            <SelectItem value="destroyed">Destroyed</SelectItem>
          </SelectContent>
        </Select>
        {errors.status && touched.status && (
          <small className="text-red-500">{errors.status}</small>
        )}
      </fieldset>
      <fieldset className="flex flex-col gap-2">
        <Label>Launch Date:</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "justify-start text-left font-normal",
                !values.launchDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon />
              {values.launchDate || <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={new Date(selectedDate)}
              defaultMonth={selectedDate ? new Date(selectedDate) : new Date()}
              onSelect={(day) =>
                setFieldValue(
                  "launchDate",
                  format(day || new Date(), "yyyy-MM-dd")
                )
              }
            />
          </PopoverContent>
        </Popover>
        {errors.launchDate && touched.launchDate && (
          <small className="text-red-500">{errors.launchDate}</small>
        )}
      </fieldset>
      <DialogFooter className="flex-row gap-2 pt-4">
        <Button type="submit">{isEditMode ? "Save" : "Add capsule"}</Button>
        <Button onClick={onClose} variant="secondary" type="button">
          Cancel
        </Button>
      </DialogFooter>
    </form>
  );
};
