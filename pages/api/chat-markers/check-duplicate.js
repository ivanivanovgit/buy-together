// api/chat-markers/check-duplicate.js
import pool from "../../../src/utils/db";

export default async function checkDuplicate(req, res) {
  if (req.method === "POST") {
    const { lat, lng, message } = req.body;

    if (!lat || !lng || !message) {
      res.status(400).json({ error: "Missing parameters" });
      return;
    }

    try {
      const result = await pool.query(
        "SELECT COUNT(*) FROM chat_markers WHERE lat = $1 AND lng = $2 AND message_markers = $3",
        [lat, lng, message]
      );
      res.status(200).json({ isDuplicate: result.rows[0].count > 0 });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
