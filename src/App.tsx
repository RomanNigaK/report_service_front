import MessageQueue from "@components/messageQueue";
import "./style/global.scss";
import "./style/sass/index.sass";
import { Routing } from "Routing";

export default function App() {
  return (
    <div>
      <Routing />
      <MessageQueue />
    </div>
  );
}
