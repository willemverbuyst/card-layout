import { type Metadata } from "next";
import CardLayout from "../components/card-layout";

export const metadata: Metadata = {
  title: "CardLayout",
};

export default function Home() {
  return <CardLayout />;
}
