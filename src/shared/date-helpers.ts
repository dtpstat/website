import "dayjs/locale/ru";

import dayjs from "dayjs";

dayjs.locale("ru");

export const formatDate = (date?: string | Date | null) =>
  dayjs(date).format("D MMMM YYYY");
