import moment from "moment";
import 'moment/dist/locale/es';

export const navigateByRole = (role_id) => {
  switch (role_id) {
    case 1:
      return "/admin";
    case 2:
      return "/local/sales";
    case 3:
      return "/external/sales";
    case 4:
      return "/producer/auctions";
    case 5:
      return "/transportist/auctions";
    case 21:
      return "/consultant";
    default:
      return "/unknown";
  }
};

export const formatDate = (date, format) => {
  return moment(new Date(date)).format(format);
};
