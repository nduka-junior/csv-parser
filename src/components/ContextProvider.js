"use client";
import { createContext, useState, useEffect } from "react";
import { auth } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { parse } from "papaparse";
import { useRouter } from "next/navigation";
export const Context = createContext({
  user: null,
  loading: true,
  error: null,
  data: null,
  mainData: null,
  signInWithGoogle: () => {},
  setSearch: () => {},
  handlefile: () => {},
  handleSearch: () => {},
  readfile: () => {},
});
function ContextProvider({ children }) {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);
  // PROVIDER
  const googleProvider = new GoogleAuthProvider();
  // SIGN IN WITH GOOGLE
  const signInWithGoogle = async () => {
    console.log("working");
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        console.log(token + "token");
        // The signed-in user info.
        const user = result.user;
        localStorage.setItem("user", true);
        console.log(user);
      })
      .catch((error) => {
        console.log(error + "error");
        // Handle Errors here.
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // // The email of the user's account used.
        // const email = error.customData.email;
        // // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  // cSV PARSER HANDLING
  const [file, setFile] = useState(null);

  const [data, setData] = useState(null);
  const [search, setSearch] = useState("");
  const [mainData, setMainData] = useState(null);
  const handlefile = (e) => {
    setFile(e.target.files);
    console.log(file);
  };
  const handleSearch = () => {
    const getSearch = search.trim().toLowerCase();
    console.log(getSearch);
    const filterData = mainData.data.filter((items) => {
      return Object.values(items).some((value) => {
        console.log(value);
        return value.toLowerCase().includes(getSearch);
      });
    });
    setData({ ...data, data: filterData, filterData });
    console.log(filterData);
    if (search.length === 0) setData(mainData);
  };
  useEffect(() => {
    if (data) {
      handleSearch();
      console.log(search);
    }
  }, [search]);
  const readfile = () => {
    if (!file) {
      return alert("Please Upload a file");
    }
    console.log("working!!");
    console.log(file);
    const reader = new FileReader();
    reader.onload = () => {
      const csv = reader.result;
      console.log(csv);
      const results = parse(csv, { header: true });
      console.log(results);
      setData(results);
      setMainData(results);
    };
    reader.readAsText(file[0]);
    setFile("");
    router.push("/parser");
  };
  const contextValue = {
    user,
    loading,
    error,
    data,
    mainData,
    signInWithGoogle,
    setSearch,
    handlefile,
    handleSearch,
    readfile,
  };
  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
}

export default ContextProvider;
