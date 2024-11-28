import Image from "next/image";
import TodoApp from "@/components/TodoList";

export default function Home() {
  return (
    <div style={{ backgroundColor: "#121212", minHeight: "100vh", padding: "20px" }}>
      <TodoApp />
    </div>
  );
}
