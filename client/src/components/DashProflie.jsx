import { Alert, Button, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function DashProflie() {
  const { currentuser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileAsUrl, setImageFileAsUrl] = useState(null);
  const filePickerRef = useRef();
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      //create a temp image file in your browser to see how it would look like
      setImageFileAsUrl(URL.createObjectURL(file));
    }
  };
  // if any time there is a new image upload it
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);
  const uploadImage = () => {
    setImageFileUploadError(null);
    const storage = getStorage(app);
    //the image filename is always going to be unique
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    //upload task and get % when being uploaded
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        //every snapshot gets updated
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // toFixed so it won't have any decimals
        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError(
          "Could not upload image (File must be less than 2MB)"
        );
        setImageFileUploadProgress(null);
        setImageFileAsUrl(null);
        setImageFile(null);
      },
      //Get Feedback
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          //The url from firebase
          setImageFileAsUrl(downloadURL);
        });
      }
    );
  };
  return (
    <div className=" max-w-lg mx-auto w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">profile</h1>
      <form className="flex flex-col gap-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        <div
          className=" relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full border "
          onClick={() => {
            filePickerRef.current.click();
          }}
        >
          {imageFileUploadProgress && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199,${imageFileUploadProgress / 100})`,
                },
              }}
            />
          )}
          <img
            src={imageFileAsUrl || currentuser.profilePicture}
            alt="user"
            className="rounded-full w-full h-full border-8 border-[lightgray] object-cover"
          />
        </div>
        {imageFileUploadError && (
          <Alert color="failure">{imageFileUploadError}</Alert>
        )}
        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentuser.username}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="Email"
          defaultValue={currentuser.email}
        />
        <TextInput type="password" id="password" placeholder="password..." />
        <Button type="submit" gradientDuoTone="purpleToBlue" outline>
          Update
        </Button>
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span className="cursor-pointer ml-1">Delete Account</span>
        <span className="cursor-pointer mr-1">Sign Out</span>
      </div>
    </div>
  );
}
