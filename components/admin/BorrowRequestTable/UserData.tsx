"use client";

import React, { useEffect, useRef, useState } from "react";
import { User } from "@/types";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Tooltip } from "antd";

type UserDataProps = {
  user: User;
  labelMaxWidth?: number;
};

const UserData = ({ user, labelMaxWidth = 150 }: UserDataProps) => {
  const labelRef = useRef<HTMLLabelElement>(null);
  const [tooltipText, setTooltipText] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const checkTruncation = () => {
      if (labelRef.current) {
        const isTruncated =
          labelRef.current.scrollWidth > labelRef.current.clientWidth;
        setTooltipText(isTruncated ? user.email : "");
      }
    };

    checkTruncation();
    window.addEventListener("resize", checkTruncation, {
      signal: controller.signal,
    });

    return () => controller.abort();
  }, [user.email]);

  return (
    <div className="flex gap-4">
      <div>
        <Image
          className="size-8 min-w-8 rounded-full"
          src={user.universityCard}
          alt={user.fullName}
          width={100}
          height={100}
        />
      </div>
      <div className="flex flex-col gap-1">
        <Label>{user.fullName}</Label>

        <Tooltip title={tooltipText}>
          <Label
            ref={labelRef}
            className="block truncate text-gray-500"
            style={{
              maxWidth: labelMaxWidth,
            }}
          >
            {user.email}
          </Label>
        </Tooltip>
      </div>
    </div>
  );
};

export default UserData;
