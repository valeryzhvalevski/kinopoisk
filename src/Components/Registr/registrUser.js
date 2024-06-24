export default async function registrUser(
  objUser,
  auth,
  createUserWithEmailAndPassword,
  setValidPass,
  setPassLength,
  setEmptyfield,
  setValidUser,
  navigate,
  addUser
) {
  if (
    objUser.email == "" ||
    objUser.password == "" ||
    objUser.surname == "" ||
    objUser.name == "" ||
    objUser.secondpassword == ""
  ) {
    setEmptyfield(true);
    return;
  }
  if (objUser.password !== objUser.secondpassword) {
    setValidPass(true);
    return;
  }
  if (objUser.password.length < 6 || objUser.secondpassword.length < 6) {
    setPassLength(true);
    return;
  }
  createUserWithEmailAndPassword(auth, objUser.email, objUser.password)
    .then((user) => {
      navigate("/")
      addUser({email: objUser.email, password: objUser.password})
})
    .catch((err) => {
      setValidUser(true);
    });
}
