import Image from "next/image";
import Header from "@/components/header";

export default function Home() {
  return (
    <div className="flex-1 text-center justify-between flex-col">
      <Header/>
      <div >
        <p>
          Hello World!
        </p>
      </div>
    </div>
  );
}
