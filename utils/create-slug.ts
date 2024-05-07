export function createSlug(name: string) {
  let modifiedName = name.trim(); // Remove leading and trailing whitespaces
  modifiedName = modifiedName.replace(/[^\w\s]/g, ""); // Remove non-alphanumeric characters
  const splitedname = modifiedName.split(" ");
  const joinedName = splitedname.join("-").toLowerCase();
  return joinedName;
}
