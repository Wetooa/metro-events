import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  title: string;
}

export default function Input({ title, ...props }: InputProps) {
  return (
    <>
      <label htmlFor={props.name}>{title}</label>
      <input {...props} />
    </>
  );
}
