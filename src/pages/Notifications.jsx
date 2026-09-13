import { useState } from "react";
import Navbar from "../components/Navbar";

function Notifications() {
  const [notifications, setNotifications] = useState(
    JSON.parse(localStorage.getItem("notifications")) || []
  );

  function markAsRead(id) {
    const updated = notifications.map((notification) =>
      notification.id === id
        ? { ...notification, read: true }
        : notification
    );

    setNotifications(updated);
    localStorage.setItem("notifications", JSON.stringify(updated));
  }

  function markAllAsRead() {
    const updated = notifications.map((notification) => ({
      ...notification,
      read: true
    }));

    setNotifications(updated);
    localStorage.setItem("notifications", JSON.stringify(updated));
  }

  function clearNotifications() {
    setNotifications([]);
    localStorage.setItem("notifications", JSON.stringify([]));
  }

  return (
    <>
      <Navbar />

      <div className="notifications-page">
        <div className="notifications-header">
          <div>
            <h1>Notifications</h1>
            <p>Stay updated with your farming activity.</p>
          </div>

          <div className="notification-actions">
            <button onClick={markAllAsRead}>Mark All Read</button>
            <button className="secondary-action" onClick={clearNotifications}>
              Clear All
            </button>
          </div>
        </div>

        {notifications.length === 0 ? (
          <div className="empty-state">
            <h3>No notifications</h3>
            <p>You're all caught up!</p>
          </div>
        ) : (
          <div className="notification-list">
            {notifications.map((notification) => (
              <div
                className={`notification-card ${notification.read ? "read" : "unread"}`}
                key={notification.id}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="notification-icon">
                  {notification.type === "offer" && "💰"}
                  {notification.type === "contract" && "📄"}
                  {notification.type === "delivery" && "🚚"}
                  {notification.type === "payment" && "💳"}
                  {notification.type === "general" && "🔔"}
                </div>

                <div className="notification-content">
                  <h3>{notification.title}</h3>
                  <p>{notification.message}</p>
                  <small>{notification.time}</small>
                </div>

                {!notification.read && <span className="unread-dot" />}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Notifications;
