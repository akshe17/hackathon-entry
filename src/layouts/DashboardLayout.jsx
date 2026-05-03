import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Box, Stack, Text, UnstyledButton, Avatar, Divider, Group } from "@mantine/core";
import { Activity, ScanBarcode, BookOpen, Calendar, Settings, LogOut, Menu, X } from "lucide-react";
import { BrandName } from "../components/BrandName";

const NAVY = "#0a2366";

const NAV_ITEMS = [
  { icon: Activity,    label: "Dashboard",       href: "/dashboard"          },
  { icon: ScanBarcode, label: "Scan & Swap",      href: "/dashboard/scan"     },
  { icon: BookOpen,    label: "AI Diary",         href: "/dashboard/diary"    },
  { icon: Calendar,    label: "Health Calendar",  href: "/dashboard/calendar" },
];

function NavItem({ icon: Icon, label, href, active, onClick }) {
  return (
    <UnstyledButton
      component={Link}
      to={href}
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "10px 14px",
        borderRadius: 6,
        backgroundColor: active ? "#eff4ff" : "transparent",
        color: active ? NAVY : "#6b7280",
        fontWeight: active ? 600 : 400,
        fontSize: 14,
        transition: "background-color 0.15s, color 0.15s",
        textDecoration: "none",
      }}
      onMouseEnter={(e) => { if (!active) { e.currentTarget.style.backgroundColor = "#f5f7ff"; e.currentTarget.style.color = NAVY; } }}
      onMouseLeave={(e) => { if (!active) { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#6b7280"; } }}
    >
      <Icon size={16} />
      {label}
    </UnstyledButton>
  );
}

function Sidebar({ location, onClose }) {
  return (
    <Box style={{
      width: 220, height: "100%", backgroundColor: "#fff",
      borderRight: "1px solid #f0f3fa",
      display: "flex", flexDirection: "column", padding: "24px 16px",
      flexShrink: 0,
    }}>
      {/* Brand */}
      <Group justify="space-between" align="center" mb={32} px={2}>
        <Text component={Link} to="/" fw={600} size="md"
          style={{ color: NAVY, textDecoration: "none", letterSpacing: "-0.02em" }}>
          <BrandName />
        </Text>
        {onClose && (
          <UnstyledButton onClick={onClose} style={{ color: "#9ca3af", lineHeight: 1 }}>
            <X size={18} />
          </UnstyledButton>
        )}
      </Group>

      {/* Nav */}
      <Stack gap={4} style={{ flex: 1 }}>
        {NAV_ITEMS.map((item) => (
          <NavItem key={item.href} {...item} active={location.pathname === item.href} onClick={onClose} />
        ))}
      </Stack>

      <Divider color="#f0f3fa" my="md" />

      {/* Bottom */}
      <Stack gap={4}>
        <NavItem icon={Settings} label="Settings" href="/dashboard/settings" active={location.pathname === "/dashboard/settings"} onClick={onClose} />
        <UnstyledButton style={{
          display: "flex", alignItems: "center", gap: 12,
          padding: "10px 14px", borderRadius: 6, fontSize: 14,
          color: "#9ca3af", transition: "color 0.15s",
        }}
          onMouseEnter={(e) => e.currentTarget.style.color = "#ef4444"}
          onMouseLeave={(e) => e.currentTarget.style.color = "#9ca3af"}
        >
          <LogOut size={16} />
          Log out
        </UnstyledButton>
      </Stack>

      {/* User pill */}
      <Box mt="md" style={{
        padding: "10px 12px", borderRadius: 8,
        backgroundColor: "#f8faff",
        border: "1px solid #e8ecf5",
      }}>
        <Group gap="sm">
          <Avatar size={32} radius="xl" style={{ backgroundColor: NAVY, color: "#fff", fontSize: 11, fontWeight: 700 }}>JD</Avatar>
          <Box style={{ overflow: "hidden" }}>
            <Text size="xs" fw={600} style={{ color: NAVY, lineHeight: 1.3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Juan Dela Cruz</Text>
            <Text size="10px" style={{ color: "#9ca3af" }}>General Wellness</Text>
          </Box>
        </Group>
      </Box>
    </Box>
  );
}

export default function DashboardLayout() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Box style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f0f4f8" }}>
      {/* Desktop sidebar */}
      <Box style={{ display: "none" }} visibleFrom="md">
        <Sidebar location={location} />
      </Box>
      <Box hiddenFrom="md" style={{ display: "none" }}>
        {/* placeholder so flex layout isn't broken on mobile */}
      </Box>

      {/* Desktop sidebar (CSS-only, avoids Mantine display issues) */}
      <Box className="dashboard-sidebar">
        <Sidebar location={location} />
      </Box>

      {/* Mobile overlay */}
      {mobileOpen && (
        <Box style={{
          position: "fixed", inset: 0, zIndex: 200,
          display: "flex",
        }}>
          <Sidebar location={location} onClose={() => setMobileOpen(false)} />
          <Box style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.4)" }} onClick={() => setMobileOpen(false)} />
        </Box>
      )}

      {/* Main area */}
      <Box style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Mobile topbar */}
        <Box className="dashboard-topbar" style={{
          display: "none", alignItems: "center", gap: 12,
          padding: "14px 20px", backgroundColor: "#fff",
          borderBottom: "1px solid #f0f3fa",
        }}>
          <UnstyledButton onClick={() => setMobileOpen(true)} style={{ color: NAVY, lineHeight: 1 }}>
            <Menu size={20} />
          </UnstyledButton>
          <Text fw={600} size="md" style={{ color: NAVY, letterSpacing: "-0.02em" }}>
            <BrandName />
          </Text>
        </Box>

        <Box style={{ flex: 1, overflowY: "auto" }}>
          <Outlet />
        </Box>
      </Box>

      <style>{`
        .dashboard-sidebar { display: flex; height: 100vh; position: sticky; top: 0; }
        .dashboard-topbar  { display: none; }
        @media (max-width: 768px) {
          .dashboard-sidebar { display: none; }
          .dashboard-topbar  { display: flex !important; }
        }
      `}</style>
    </Box>
  );
}
