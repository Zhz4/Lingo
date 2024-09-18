"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useExitModal } from "@/store/use-exit-modal";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import Image from "next/image";

export const ExitModal = () => {
  const router = useRouter();
  const { isOpen, close } = useExitModal();
  const [isclient, setIsClient] = useState(false);

  // 只会在初次渲染时执行
  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isclient) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-w-md bg-white">
        <DialogHeader>
          <div className="flex items-center w-full justify-center mb-5">
            <Image src="/mascot_sad.svg" alt="Mascot" height={80} width={80} />
          </div>
          <DialogTitle className="text-center font-bold text-2xl">
            Wait, don not go!
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            you are about to leave the lesson. Are you sure?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mb-4">
          <div className="flex flex-col gap-y-4 w-full">
            <Button
              variant="primary"
              className="w-full"
              size="lg"
              onClick={close}
            >
              Keep learning
            </Button>
            <Button
              variant="dangerOutline"
              className="w-full"
              size="lg"
              onClick={()=>{
                close()
                router.push('/learn')
              }}
            >
              End session
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
