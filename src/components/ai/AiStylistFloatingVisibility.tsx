'use client';

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { HIDE_AI_STYLIST_ROUTES } from "@/src/constants/uiVisibility";
import { AiStylistChatFloatingButton } from "./AiStylistChatFloatingButton";

interface AiStylistFloatingVisibilityProps {
  children: ReactNode;
}

export const AiStylistFloatingVisibility = ({
  children
}: AiStylistFloatingVisibilityProps) => {
  const pathname = usePathname();
  const hideAIStylist = HIDE_AI_STYLIST_ROUTES.some(route =>
    pathname.startsWith(route)
  );

  return (
    <>
      {children}
      {!hideAIStylist && <AiStylistChatFloatingButton />}
    </>
  );
};

export default AiStylistFloatingVisibility;
