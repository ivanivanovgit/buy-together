// [routeId].js
import pool from "../../../src/utils/db";

export default async function handler(req, res) {
  const {
    query: { routeId },
  } = req;

  if (req.method === "DELETE") {
    try {
      const result = await pool.query("DELETE FROM routes WHERE id = $1", [
        routeId,
      ]);
      if (result.rowCount > 0) {
        res.status(204).end(); // No Content
      } else {
        res.status(404).json({ message: "Route not found" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
