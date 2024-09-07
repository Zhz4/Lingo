"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { courses, userProgress } from "@/db/schema";
import { Card } from "./card";
import { upsertUserProgress } from "@/actions/user-progress";
import { toast } from "sonner";

type Props = {
  courses: (typeof courses.$inferSelect)[];
  activeCouseId?: typeof userProgress.$inferSelect.activeCourseId;
};

export const List = ({ courses, activeCouseId }: Props) => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const onClick = (id: number) => {
    if (pending) return;

    if (id === activeCouseId) {
      router.push("/learn");
      return;
    }

    startTransition(() => {
      upsertUserProgress(id).catch(() => toast.error("Something went wrong"));
    });
  };

  return (
    <div className="pt-6 grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4">
      {courses.map((course) => (
        <Card
          key={course.id}
          id={course.id}
          title={course.title}
          imageSrc={course.imageSrc}
          onClick={onClick}
          disabled={false}
          active={course.id === activeCouseId}
        />
      ))}
    </div>
  );
};
