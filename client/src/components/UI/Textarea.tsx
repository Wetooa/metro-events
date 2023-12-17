import { TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  title: string;
}

export default function Textarea({ title, ...props }: Readonly<TextareaProps>) {
  return (
    <>
      <label htmlFor={props.name}>{title}</label>
      <textarea {...props}></textarea>
    </>
  );
}
