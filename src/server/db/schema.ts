/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { int, text, singlestoreTable } from "drizzle-orm/singlestore-core";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
export const users = singlestoreTable("users_table", {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  name: text("name"),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  age: int("age"),
});
