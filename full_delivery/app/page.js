import { Button } from "@/components/ui/button";
import { ChevronDownCircle, LineChart, Link2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <p>Daniel</p>
      <Button>Enviar</Button>
      <ChevronDownCircle />
      <div>
        <Link href="/about" className="w-10 h-10">
          <Link2 /> About
        </Link>
      </div>
    </div>
  );
}
