const signUp = (req, res) => {
  res.json({ message: "sign-up" });
};

const signIn = (req, res) => {
  res.json({ message: "sign in" });
};

const signOut = (req, res) => {
  res.json({ message: "sign out" });
};

const currentUser = (req, res) => {
  res.json({ message: "currentUser" });
};

export { signUp, signIn, signOut, currentUser };
