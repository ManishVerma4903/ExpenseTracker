"use client";
import React, { useState } from "react";
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MenuFoldOutlined, // Use this for a better UX
  MenuUnfoldOutlined, // Use this for a better UX
  PieChartOutlined,
} from "@ant-design/icons";
// Removed 'type { MenuProps } from "antd";' as it's TypeScript specific
import { Menu } from "antd";
import Link from "next/link";

// Removed 'type MenuItem = Required<MenuProps>["items"][number];'
// And 'const items: MenuItem[] =' type annotation

const items = [
  {
    key: "1",
    icon: <PieChartOutlined />,
    label: <Link href="/">Dashboard</Link>,
  },
  // You had these commented out, so they remain commented out:
  // {
  //   key: "2",
  //   icon: <DesktopOutlined />,
  //   label: <Link href="create-expense">Create Expense</Link>,
  // },
  // {
  //   key: "3",
  //   icon: <ContainerOutlined />,
  //   label: <Link href="add-income">Add Income</Link>,
  // },
  //   {
  //     key: "sub1",
  //     label: "Navigation One",
  //     icon: <MailOutlined />,
  //     children: [
  //       { key: "5", label: "Option 5" },
  //       { key: "6", label: "Option 6" },
  //       { key: "7", label: "Option 7" },
  //       { key: "8", label: "Option 8" },
  //     ],
  //   },
];


// Removed 'React.FC' type annotation
const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div
      style={{
        width: collapsed ? 80 : 260,
        height: "100vh",
        position: "sticky",
        top: 0,
        display: "flex",
        flexDirection: "column",
        transition: "width 0.2s",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "space-between",
          padding: "16px",
        }}
      >
        {!collapsed && (
          <h1 style={{ margin: 0, fontSize: "1.2rem" }}>Expense Tracker</h1>
        )}


        <div
          onClick={toggleCollapsed}
          style={{ cursor: "pointer", fontSize: "18px" }}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </div>
      </div>


      <Menu
        defaultSelectedKeys={["1"]}
        mode="inline"
        theme="light"
        items={items}
        inlineCollapsed={collapsed}
        style={{ flex: 1, borderRight: 0  }}
      />
    </div>
  );
};


export default Sidebar;
