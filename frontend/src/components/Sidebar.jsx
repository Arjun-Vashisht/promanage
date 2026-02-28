import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  Activity
} from "lucide-react";

export default function Sidebar() {

  const location = useLocation();

  const menu = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/"
    },
    {
      name: "Profile",
      icon: User,
      path: "/profile"
    },
    {
      name: "Activity Logs",
      icon: Activity,
      path: "/activity-logs"
    }
  ];

  return (
    <div className="
      w-64
      bg-white dark:bg-gray-900
      border-r border-gray-200 dark:border-gray-800
      shadow-sm
      transition-colors
    ">

      {/* Logo */}
      <div className="
        p-5 text-xl font-semibold
        text-indigo-600
        border-b border-gray-200 dark:border-gray-800
      ">
        ProManage
      </div>

      <nav className="flex-1">

        {menu.map(item => {

          const Icon = item.icon;
          const active = location.pathname === item.path;

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`
                flex items-center gap-3 px-4 py-3
                transition-colors

                ${
                  active
                    ? `
                      bg-indigo-50 dark:bg-indigo-900/40
                      text-indigo-600 dark:text-indigo-400
                      border-r-2 border-indigo-600 dark:border-indigo-400
                    `
                    : `
                      text-gray-700 dark:text-gray-300
                      hover:bg-gray-100 dark:hover:bg-gray-800
                    `
                }
              `}
            >
              <Icon size={18} />
              {item.name}
            </Link>
          );

        })}

      </nav>

    </div>
  );

}
