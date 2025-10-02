import { SQLDatabase } from "encore.dev/storage/sqldb";

export default new SQLDatabase("cuadriciclos_db", {
  migrations: "./migrations",
});
