"use client";

import type { User } from "better-auth";
import React, { useRef } from "react";
import { useUser } from "~/stores/hooks";
import type { Organization } from "~/stores/slices/user.slice";

type RootContextProps = {
  user: User | undefined;
  orgDetails: Organization[] | undefined;
};

const RootContext = ({
  children,
  values,
}: {
  children: React.ReactNode;
  values: RootContextProps;
}) => {
  const { setUser } = useUser();
  const initialized = useRef(false);

  if (!initialized.current && values.user && values.orgDetails) {
    const { name, email, image } = values.user;
    const activeOrg = values.orgDetails.find((org) => org.isActive)!;

    setUser({
      data: {
        name,
        email,
        image,
        position: activeOrg.position ?? "Intern",
        role: activeOrg.role,
        pastOrgs: values.orgDetails,
        activeOrg,
      },
    });

    initialized.current = true;
  }

  return <>{children}</>;
};

export default RootContext;
