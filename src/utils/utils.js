export const navigateByRole = (role_id) => {
  switch (role_id) {
    case 1:
      return "/admin";
    case 2:
      return "/local";
    case 3:
      return "/external";
    case 4:
      return "/producer";
    case 5:
      return "/transportist";
    case 21:
      return "/consultant";
    default:
      return "/unknown";
  }
};
