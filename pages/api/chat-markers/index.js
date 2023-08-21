// api/chat-markers/index.js
import pool from "../../../src/utils/db";

export default async function chatMarkers(req, res) {
  if (req.method === "POST") {
    const { lat, lng, theme, message_markers } = req.body;
    try {
      const result = await pool.query(
        "INSERT INTO chat_markers(lat, lng, theme, message_markers) VALUES($1, $2, $3, $4) RETURNING id",
        [lat, lng, theme, message_markers]
      );
      res.status(200).json({ id: result.rows[0].id });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else if (req.method === "GET") {
    try {
      const result = await pool.query("SELECT * FROM chat_markers");
      res.status(200).json(result.rows);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
