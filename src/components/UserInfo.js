import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth } from "@/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Link from "next/link";
function UserInfo() {
  const [user, loading, error] = useAuthState(auth);
  function getInitials(fullName) {
    const names = fullName.split(" ");
    let initials = "";

    names.forEach((name) => {
      initials += name.charAt(0).toUpperCase();
    });

    return initials;
  }
    return (
      <div className="mr-2">
        <Link href={`/user/${user?.uid}`}>
          <Avatar>
            <AvatarImage src={user.photoURL} />
            <AvatarFallback>{getInitials(user.displayName)}</AvatarFallback>
          </Avatar>
        </Link>
      </div>
    );
}

export default UserInfo;
