// /api/chat-markers/delete-marker/[markerId].js
import pool from "../../../../src/utils/db";

export default async function handler(req, res) {
  const { markerId } = req.query;

  if (req.method === "DELETE") {
    try {
      const result = await pool.query(
        "DELETE FROM chat_markers WHERE id = $1",
        [markerId]
      );
      if (result.rowCount === 0) {
        // Если rowCount равно 0, маркера с таким markerId нет в базе данных
        res.status(404).json({ error: "Marker not found" });
      } else {
        res.status(200).json({ status: "Marker deleted" });
      }
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
