// api/chat-markers/share-marker/[id].js
import pool from "../../../../src/utils/db";

export default async function marker(req, res) {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const result = await pool.query(
        "SELECT * FROM chat_markers WHERE id=$1",
        [id]
      );
      if (result.rows.length > 0) {
        res.status(200).json(result.rows[0]);
      } else {
        res.status(404).json({ error: "Marker not found" });
      }
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
