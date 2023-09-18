
import member from "@/assets/images/home/mobile/member.svg";
import notification from "@/assets/images/home/mobile/notifications.svg";
import styled from 'styled-components';
import CardPrompt from "./cardPrompt";

const promptList = [
    {
        key: "notification",
        iconUrl: notification,
        text: "Notifications~~~Notifications",
    },
    {
        key: "member",
        iconUrl: member,
        text: "2891",
    }
]

const Container = styled.div`
    margin-bottom: 15px;
    width: 100%;
    overflow-x: auto;
    white-space: nowrap;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
`;

const CardPromptContainer = () => {
    return (
        <Container>
            {promptList.map(item => (
                <CardPrompt
                    key={item.key}
                    imageUrl={item.iconUrl}
                    text={item.text}
                />
            ))}
        </Container>
    );
};

export default CardPromptContainer;
