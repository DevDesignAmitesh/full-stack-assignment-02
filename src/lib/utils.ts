import { NextResponse } from "next/server";
import { ZodError } from "zod";
import axios from "axios";
import { toast } from "sonner";

export const BACKEND_URL =
  process.env.NODE_ENV === "production"
    ? "https://full-stack-assignment-02.vercel.app/"
    : "http://localhost:3000";

export const formatDate = (date: string) => {
  const data = new Date(date);
  return data.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

export const responsePlate = ({
  message,
  status,
  data,
}: {
  message: string;
  status: number;
  data?: any;
}) => {
  return NextResponse.json({ message, data }, { status });
};

export const zodErrorMessage = ({ error }: { error: ZodError }) => {
  return error.issues
    .map((er) => `${er.path.join(".")}: ${er.message}`)
    .join(", ");
};

export function handleAxiosError(err: unknown, fallback: string) {
  if (axios.isAxiosError(err)) {
    const message = err.response?.data?.message || fallback;
    console.log(message);
    toast.error(message);
    return;
  }
  console.log(fallback);
  toast.error(fallback);
}
