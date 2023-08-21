// api/chat-markers/[filtrTheme].js
import pool from "../../../src/utils/db";

export default async function filtrTheme(req, res) {
  if (req.method === "GET") {
    const theme = req.query.filtrTheme;

    if (!theme) {
      res.status(400).json({ error: "Missing theme parameter" });
      return;
    }

    try {
      const result = await pool.query(
        "SELECT * FROM chat_markers WHERE theme = $1 ORDER BY id ASC",
        [theme]
      );
      res.status(200).json(result.rows);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
