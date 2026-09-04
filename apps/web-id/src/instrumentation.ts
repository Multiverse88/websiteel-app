export async function register() {
  if (process.env.NODE_ENV !== "production") return;

  if (process.env.NEXT_RUNTIME === "nodejs") {
    // Auto-trigger email blast queue every 1 minute (aktif juga di local/development untuk testing)
    setInterval(() => {
      // Panggil endpoint cron kita sendiri secara internal
      fetch("http://127.0.0.1:3000/api/cron/process-queue").catch(() => {});
    }, 60 * 1000);
  }
}
