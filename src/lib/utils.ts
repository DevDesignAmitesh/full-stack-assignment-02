import { NextResponse } from "next/server";

export const BACKEND_URL = "http://localhost:3000";

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
