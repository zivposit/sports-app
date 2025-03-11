export function fetchRandomPicture(name?: string): string {
  return name
    ? `https://ui-avatars.com/api/?name=${encodeURIComponent(
        name
      )}&background=random`
    : "https://thispersondoesnotexist.com/";
}
