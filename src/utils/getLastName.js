const getLastName = (fullName) => {
  if (!fullName) return "User";
  const parts = fullName.trim().split(" ");
  return parts[parts.length - 1];
};

export default getLastName;
