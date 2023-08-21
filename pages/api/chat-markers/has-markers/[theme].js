// api/chat-markers/has-markers/[theme].js
import pool from "../../../../src/utils/db";

export default async function themeHasMarkers(req, res) {
  if (req.method === "GET") {
    const theme = req.query.theme;

    if (!theme) {
      res.status(400).json({ error: "Missing theme parameter" });
      return;
    }

    try {
      const result = await pool.query(
        "SELECT COUNT(*) FROM chat_markers WHERE theme = $1",
        [theme]
      );
      res.status(200).json({ hasMarkers: result.rows[0].count > 0 });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
