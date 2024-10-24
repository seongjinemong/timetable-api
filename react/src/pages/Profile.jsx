import { jwtDecode } from "jwt-decode";
import { useAuthStore } from "../lib/store";
import { useEffect, useState } from "react";
import customAaxios from "../lib/axios";

export default function Profile() {
  const credentials = useAuthStore((state) => state.credentials);
  var info;

  if (credentials) info = jwtDecode(credentials.credential);

  console.log(info);

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      if (credentials) {
        const res = await customAaxios.get("/user/profile", {
          withCredentials: true,
        });
        setProfile(res.data);
      }
    }
    fetchProfile();
  }, [credentials]);

  return (
    <>
      <div className="w-full flex flex-col items-center gap-4">
        <div
          onClick={() => (window.location.href = "/")}
        >{`< back to main`}</div>
        <div>Profile Page</div>
        {info ? (
          <>
            <img className="w-40 h-40" src={info.picture} alt="Profile" />
            <div className="text-xl font-bold">{`${info.name}`}</div>
            <div>{`${info.email}`}</div>
          </>
        ) : (
          <div>Not Logged In</div>
        )}

        {profile ? <div>{`${JSON.stringify(profile)}`}</div> : <></>}
      </div>
    </>
  );
}
