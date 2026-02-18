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
    <div className="w-64 bg-white border-r border-gray-200 shadow-sm">

      <div className="p-5 text-xl font-semibold text-indigo-600 border-b">
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
                hover:bg-gray-100 transition
                ${active
                  ? "bg-indigo-50 text-indigo-600 border-r-2 border-indigo-600"
                  : "text-gray-700"
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
