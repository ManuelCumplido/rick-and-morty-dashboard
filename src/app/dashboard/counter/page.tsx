import { CarCounter } from "@/src/shopping-car";

export const metadata = {
  title: "Shopping Car",
  description: "Contador Client Side",
}

export default function CounterPage() {

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <span>Productos</span>
      <CarCounter value={20} />
    </div>
  );
}
