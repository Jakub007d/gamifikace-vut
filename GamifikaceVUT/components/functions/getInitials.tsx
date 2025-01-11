export default function getInitials(name: string): string {
  console.log(name);
  const splitted = name.split(" ");

  if (splitted.length > 1 && splitted[1]) {
    return splitted[0][0] + splitted[1][0];
  }

  const word = splitted[0];
  return (word[0] + word[word.length - 1]).toUpperCase();
}
