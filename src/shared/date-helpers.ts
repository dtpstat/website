import "dayjs/locale/ru";

import dayjs from "dayjs";

dayjs.locale("ru");

export const formatDate = (date?: string) => dayjs(date).format("D MMMM YYYY");
