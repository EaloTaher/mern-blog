import { Button, TextInput } from "flowbite-react";
import { useSelector } from "react-redux";

export default function DashProflie() {
  const { currentuser } = useSelector((state) => state.user);
  return (
    <div className=" max-w-lg mx-auto w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">profile</h1>
      <form className="flex flex-col gap-4">
        <div className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full">
          <img
            src={currentuser.profilePicture}
            alt="user"
            className="rounded-full w-full h-full border-8 border-[lightgray] object-cover"
          />
        </div>
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
