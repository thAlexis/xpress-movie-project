import bcrypt from "bcrypt";

async function hashPassword(password) {
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  console.log("Mot de passe correctement hashé :", hash);
  return hash;
}

async function verifyPassword(password, hashedPassword) {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
}

export default { hashPassword, verifyPassword };
