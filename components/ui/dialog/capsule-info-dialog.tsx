import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./dialog";
import { Label } from "../label";
import { Capsule } from "@/types";
import { X } from "lucide-react";

type CapsuleInfoDialogProps = {
  capsuleInfo: Capsule;
  isOpen: boolean;
  onClose: () => void;
};

export const CapsuleInfoDialog = ({
  capsuleInfo,
  isOpen,
  onClose,
}: CapsuleInfoDialogProps) => {
  return (
    <Dialog open={isOpen}>
      {/* <DialogTrigger asChild>{children}</DialogTrigger> */}
      <DialogContent onPointerDownOutside={onClose}>
        <DialogClose onClick={onClose}>
          <X />
        </DialogClose>
        <DialogHeader>
          <DialogTitle>Capsule Details</DialogTitle>
          <DialogDescription>
            See relevant information about a capsule
          </DialogDescription>
        </DialogHeader>
        <CapsuleInfoRow label="Capsule ID:" value={capsuleInfo.serial} />
        <CapsuleInfoRow label="Type:" value={capsuleInfo.type} />
        <CapsuleInfoRow label="Launch Date:" value={capsuleInfo.launchDate} />
        <CapsuleInfoRow label="Status:" value={capsuleInfo.status} />
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
