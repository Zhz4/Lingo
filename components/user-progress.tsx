import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { InfinityIcon } from "lucide-react";
import { courses } from "@/db/schema";

type Props = {
  activeCourse: typeof courses.$inferSelect 
  hearts: number;
  potints: number;
  hasActiveSubscription: boolean;
};

export const UserProgress = ({
  activeCourse,
  hearts,
  potints,
  hasActiveSubscription,
}: Props) => {
  return (
    <div className="flex items-center justify-between gap-x-2 w-full">
      <Button variant="ghost">
        <Link href="/courses">
          <Image
            src={activeCourse.imageSrc}
            alt={activeCourse.title}
            className="rounded-md border"
            width={32}
            height={32}
          />
        </Link>
        <Link href="/shop">
          <Button variant="ghost" className="text-orange-500">
            <Image
              src="/points.svg"
              height={28}
              width={28}
              alt="Points"
              className="mr-2"
            />
            {potints}
          </Button>
        </Link>
        <Link href="/shop">
          <Button variant="ghost" className="text-rose-500">
            <Image
              src="/heart.svg"
              height={22}
              width={22}
              alt="Heart"
              className="mr-2"
            />
            {hasActiveSubscription ? (
              <InfinityIcon className="h-4 w-4 stroke-[3]" />
            ) : (
              hearts
            )}
          </Button>
        </Link>
      </Button>
    </div>
  );
};
