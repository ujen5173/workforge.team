export const passwordGenerator = () => {
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const special = "!@#$%^&*()_+-=[]{}|;:,.<>?";
  const all = uppercase + lowercase + numbers + special;

  const length = Math.floor(Math.random() * 7) + 10; // 10–16 chars

  const required = [
    uppercase[Math.floor(Math.random() * uppercase.length)]!,
    lowercase[Math.floor(Math.random() * lowercase.length)]!,
    numbers[Math.floor(Math.random() * numbers.length)]!,
    special[Math.floor(Math.random() * special.length)]!,
  ];

  const rest = Array.from(
    { length: length - required.length },
    () => all[Math.floor(Math.random() * all.length)]!,
  );

  return [...required, ...rest].sort(() => Math.random() - 0.5).join("");
};
