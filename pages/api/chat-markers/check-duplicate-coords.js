// api/chat-markers/check-duplicate-coords.js
import pool from "../../../src/utils/db";

export default async function checkDuplicateCoords(req, res) {
  if (req.method === "POST") {
    const { lat, lng } = req.body;

    if (!lat || !lng) {
      res.status(400).json({ error: "Missing parameters" });
      return;
    }

    try {
      const result = await pool.query(
        "SELECT COUNT(*) FROM chat_markers WHERE lat = $1 AND lng = $2",
        [lat, lng]
      );
      res.status(200).json({ isDuplicateCoords: result.rows[0].count > 0 });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
