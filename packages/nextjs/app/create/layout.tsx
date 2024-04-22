import * as React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Components",
  description: "Pre-built components with awesome default",
};

export default function ComponentsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
