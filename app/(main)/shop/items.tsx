"use client";

import { refillHeart } from "@/actions/user-progress";
import { createStripUrl } from "@/actions/user-subscription";
import { Button } from "@/components/ui/button";
import { POINTS_TO_REFILL } from "@/constants";
import Image from "next/image";
import { useTransition } from "react";
import { toast } from "sonner";

type Props = {
  hearts: number;
  points: number;
  hasActiveSubscription: boolean;
};

const Items = ({ hearts, points, hasActiveSubscription }: Props) => {
  const [pending, startTransition] = useTransition();

  const onRefillHearts = () => {
    if (pending || hearts == 5 || points < POINTS_TO_REFILL) {
      return;
    }
    startTransition(() => {
      refillHeart().catch(() => toast.error("Something went wrong"));
    });
  };

  const onUpgrade = ()=>{
    startTransition(()=>{
        createStripUrl()
        .then(response=>{
            if(response.data){
                window.location.href = response.data
            }
        })
        .catch(() => toast.error("Something went wrong"));
    })
  }

  return (
    <ul>
      <div className="flex items-center w-full p-4 gap-x-4 border-t-2">
        <Image src="/heart.svg" alt="Heart" height={50} width={50} />
        <div className="flex-1">
          <p className="text-neutral-700 text-base lg:text-xl font-bold">
            Refill hearts
          </p>
        </div>
        <Button
          onClick={onRefillHearts}
          disabled={pending || hearts === 5 || points < POINTS_TO_REFILL}
        >
          {hearts === 5 ? (
            "full"
          ) : (
            <div className="flex items-center">
              <Image src="/points.svg" alt="Points" height={20} width={20} />
              <p>{POINTS_TO_REFILL}</p>
            </div>
          )}
        </Button>
      </div>
      <div className="flex items-center w-full p-4 pt-8 gap-x-4 border-t-2">
            <Image 
              src="/unlimited.svg" 
              alt="Unlimited" 
              height={50} 
              width={50}
            />
            <div className="flex-1">
                <p className="text-neutral-700 text-base lg:text-xl font-bold">Unlimited hearts</p>
            </div>
            <Button disabled={pending} onClick={onUpgrade}>
                {hasActiveSubscription ? "settings":"upgrade"}
            </Button>
      </div>
    </ul>
  );
};

export default Items;
