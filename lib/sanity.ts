import { createClient } from "next-sanity";
import { formatDate } from "../utility/dayjs";

export const client = createClient({
  projectId: "ww9idko8",
  dataset: "production",
  apiVersion: formatDate(new Date().toISOString(), "YYYY-MM-DD"),
  useCdn: false,
});
