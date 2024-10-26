import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
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
import { CalendarIcon } from "lucide-react";
import React, { PropsWithChildren } from "react";

export const EditCapsuleDialog = ({ children }: PropsWithChildren) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Capsule</DialogTitle>
          <DialogDescription>Edit a capsule entry</DialogDescription>
        </DialogHeader>
        <EditCapsuleForm />
      </DialogContent>
    </Dialog>
  );
};

const EditCapsuleForm = () => {
  return (
    <form className="flex flex-col gap-3">
      <fieldset className="flex-col gap-2">
        <Label htmlFor="capsule-id">Capsule ID:</Label>
        <Input type="text" id="capsule-id" placeholder="xxxxxxxxxx" />
      </fieldset>
      <fieldset className="flex-col gap-2">
        <Label>Status:</Label>
        <Select>
          <SelectTrigger className="">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Unknown</SelectItem>
            <SelectItem value="banana">Active</SelectItem>
            <SelectItem value="blueberry">Retired</SelectItem>
            <SelectItem value="grapes">Destroyed</SelectItem>
          </SelectContent>
        </Select>
      </fieldset>
      <fieldset className="flex flex-col gap-2">
        <Label>Launch Date:</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "justify-start text-left font-normal"
                // !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon />
              {/* {date ? format(date, "PPP") : <span>Pick a date</span>} */}
              <span>Pick a launch date</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              // selected={date}
              // onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </fieldset>
      <DialogFooter className="flex-row gap-2 pt-4">
        <Button type="submit">Submit</Button>
        <Button variant="secondary" type="button">
          Cancel
        </Button>
      </DialogFooter>
    </form>
  );
};
