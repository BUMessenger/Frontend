import { BackgroundBox } from "src/components/ui/BackgroundBox";
import LeftChatBar from "./components/LeftBarChat";

const ChatPage: React.FC = () => {
    return (
        <>
            <BackgroundBox imagePath="BackgroundBlurred.png" />
            <LeftChatBar />
        </>
    );
};

export default ChatPage;
