import type { ReactNode } from "react";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

interface SiteShellProps {
  children: ReactNode;
  showAnnouncement?: boolean;
}

export function SiteShell({ children, showAnnouncement = true }: SiteShellProps) {
  return (
    <>
      {showAnnouncement && <AnnouncementBar />}
      <Header />
      <main id="content" className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}
