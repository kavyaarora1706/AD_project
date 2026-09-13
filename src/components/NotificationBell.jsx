import { Link } from "react-router-dom";

function NotificationBell() {
  const notifications =
    JSON.parse(localStorage.getItem("notifications")) || [];

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  return (
    <Link to="/notifications" className="notification-bell" aria-label="Notifications">
      🔔

      {unreadCount > 0 && (
        <span className="notification-count">
          {unreadCount}
        </span>
      )}
    </Link>
  );
}

export default NotificationBell;
