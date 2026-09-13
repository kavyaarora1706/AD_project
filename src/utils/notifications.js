export function addNotification(title, message, type = "general") {
  const notifications =
    JSON.parse(localStorage.getItem("notifications")) || [];

  const newNotification = {
    id: Date.now(),
    title,
    message,
    type,
    read: false,
    time: new Date().toLocaleString()
  };

  localStorage.setItem(
    "notifications",
    JSON.stringify([newNotification, ...notifications])
  );
}
