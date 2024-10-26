import { PropsWithChildren } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { Label } from "../label";

export const CapsuleInfoDialog = ({ children }: PropsWithChildren) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Capsule Details</DialogTitle>
          <DialogDescription>
            See relevant information about a capsule
          </DialogDescription>
        </DialogHeader>
        <CapsuleInfoRow label="Capsule ID:" value="XXXXXXXXXX" />
        <CapsuleInfoRow label="Type:" value="XXXXXXXXXX" />
        <CapsuleInfoRow label="Launch Date:" value="XXXXXXXXXX" />
        <CapsuleInfoRow label="Status:" value="XXXXXXXXXX" />
      </DialogContent>
    </Dialog>
  );
};

const CapsuleInfoRow = ({ label, value }: { label: string; value: string }) => {
  return (
    <div>
      <Label className="flex flex-col font-semibold">{label}</Label>
      <span className="text-neutral-700">{value}</span>
    </div>
  );
};
