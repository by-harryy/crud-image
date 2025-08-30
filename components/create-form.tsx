"use client";
import { uploadImage } from "@/lib/actions";
import { SubmitButton } from "./button";
import { useActionState } from "react";

const CreateForm = () => {
  const [state, formAction] = useActionState(uploadImage, null);

  return (
    <form action={formAction}>
      <div className="mb-4 pt-2">
        <input
          type="text"
          name="title" 
          className="py-2 w-full px-4 rounded-sm border border-sky-100"
          placeholder="Title..."
        />
        <div aria-live="polite" aria-atomic="true">
        
          <p className="text-sm mt-2 text-red-500">{state?.error?.title}</p>
        </div>
      </div>
      <div className="mb-4 pt-2">
        <input
          type="file"
          name="image"
          className="file:py-2 file:px-4 file:mr-4 file:rounded-sm file:border-0 file:bg-sky-100 hover:file:bg-sky-200 file:cursor-pointer border border-slate-200 w-full"
        />
        <div aria-live="polite" aria-atomic="true">
        
          <p className="text-sm mt-2 text-red-500">{state?.error?.image}</p>
        </div>
      </div>
      <div className="mb-4 pt-4">
        <SubmitButton label={"upload"} />
      </div>
    </form>
  );
};

export default CreateForm;
