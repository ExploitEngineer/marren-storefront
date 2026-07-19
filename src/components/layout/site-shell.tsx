import type { ReactNode } from "react";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

interface SiteShellProps {
  children: ReactNode;
  headerVariant?: "default" | "minimal";
  showAnnouncement?: boolean;
}

export function SiteShell({ children, headerVariant = "default", showAnnouncement = true }: SiteShellProps) {
  return (
    <>
      {showAnnouncement && <AnnouncementBar />}
      <Header variant={headerVariant} />
      <main id="content" className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}
