import { jwtDecode } from "jwt-decode";
import { useAuthStore } from "../lib/store";

export default function Profile() {
  const credentials = useAuthStore((state) => state.credentials);
  var info;

  if (credentials) info = jwtDecode(credentials.credential);

  console.log(info);

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
      </div>
    </>
  );
}
