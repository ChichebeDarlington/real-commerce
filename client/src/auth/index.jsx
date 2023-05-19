// export const signout = () => {
//   localStorage.removeItem("userAuth");

//   //   fetch("http://localhost:8000/api/signout", {
//   //     method: "GET",
//   //   })
//   //     .then((response) => {
//   //       console.log("Signed out", response);
//   //     })
//   //     .catch((error) => console.log(error));

//   redirect("/");
// };

export const isAuthenticate = () => {
  return localStorage.getItem("userAuth")
    ? JSON.parse(localStorage.getItem("userAuth"))
    : "";
};
