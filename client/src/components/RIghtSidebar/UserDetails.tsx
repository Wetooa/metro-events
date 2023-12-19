import React from "react";
import Input from "../UI/Input";
import Button from "../UI/Button";
import Link from "next/link";

export default function UserDetails() {
  const isSignedIn = false;

  return (
    <section className="m-2 p-2 bg-white/10 rounded-lg">
      {isSignedIn ? (
        <>
          <h4 className="">Username</h4>

          <p>some info here</p>
          <p>some info here</p>
          <p>some info here</p>
        </>
      ) : (
        <>
          <h4>Join now</h4>

          <form action="">
            <Input title="Email" type="email" />
            <Input title="Password" type="password" />
            <Button isLoading={false} content="Login" type="submit">
              Login
            </Button>

            <div className="text-xs">
              Dont have an account?{" "}
              <Link className="a-link" href={"/register"}>
                Create an account
              </Link>
            </div>
          </form>
        </>
      )}
    </section>
  );
}
