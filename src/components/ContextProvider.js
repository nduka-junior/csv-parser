"use client";
import { createContext, useState, useEffect } from "react";
import { auth } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { parse } from "papaparse";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  setDoc,
  query,
  getDocs,
  where,
  getDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
export const Context = createContext({
  user: null,
  loading: true,
  error: null,
  data: null,
  mainData: null,
  name: "",
  firestoreData: "",
  signInWithGoogle: () => {},
  setSearch: () => {},
  handlefile: () => {},
  handleSearch: () => {},
  readfile: () => {},
  setName: () => {},
  getDocOnId : () => {},
});
function ContextProvider({ children }) {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);
  const [file, setFile] = useState(null);

  const [data, setData] = useState(null);
  const [search, setSearch] = useState("");
  const [mainData, setMainData] = useState(null);
  const [name, setName] = useState("");
  const [firestoreData, setFirestoreData] = useState(null);
  console.log(name);
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
        router.push(`user/${user.uid}`);
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

  useEffect(() => {
    if (data) {
      handleSearch();
      console.log(search);
    }
  }, [search]);
  // cSV PARSER HANDLING

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

  const readfile = () => {
    if (!file) {
      return toast.error("Please Upload a file");
    }
    if (name.trim().length === 0) {
      return toast.error("Please Enter a name");
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
      addData(results);
    };
    reader.readAsText(file[0]);
    setFile("");
    router.push("/parser");
  };

  // DATA UPLOAD
  const addData = async (data) => {
    try {
      const docRef = doc(collection(db, "datas"));
      await setDoc(docRef, {
        data,
        dataName: name.trim(),
        userid: user.uid,
        name: user.displayName,
        photo: user.photoURL,
        date: new Date().getTime(),
        id: docRef.id,
      });
      console.log("Document written with ID: ", docRef.id);
      setName("");
      toast.success("Data added successfully");
    } catch (e) {
      console.error("Error adding document: ", e);
      toast.error(`Error adding document ${e}`);
    }
  };
  const getDatas = async (currentUserUid) => {
    const q = query(
      collection(db, "datas"),
      where("userid", "==", currentUserUid)
    );

    // Get the documents that match the query
    const querySnapshot = await getDocs(q);

    // Extract the data from the query results
    const userDatas = querySnapshot.docs.map((doc) => doc.data());

    // Now you have an array "userDatas" containing all the documents that match the userid
    setFirestoreData(userDatas);
  };
  const getDocOnId = async (id) => {
    const docRef = doc(db, "datas", id);

    // Use the getDoc() method to fetch the document data
    try {
      const documentSnapshot = await getDoc(docRef);

      if (documentSnapshot.exists()) {
        // Document exists, you can access the data here
        const documentData = documentSnapshot.data();
        console.log(documentData);
        setData(documentData);
        setMainData(documentData);
      } else {
        // Document doesn't exist
        return null;
      }
    } catch (error) {
      console.log("Error getting document:", error);
      return error;
    }
  };
  useEffect(() => {
    if (user) getDatas(user.uid);
  }, [user]);
  const contextValue = {
    user,
    loading,
    error,
    data,
    mainData,
    name,
    firestoreData,
    signInWithGoogle,
    setSearch,
    handlefile,
    handleSearch,
    readfile,
    setName,
    getDocOnId,
  };
  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
}

export default ContextProvider;
