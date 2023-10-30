import { useUiStore } from "@/hooks/stores/useUiStore";
import styled from "styled-components";
import notification from "@/assets/t18/images/home/mobile/notifications.svg";

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 10px;
  width: 100%;
  overflow-x: auto;
  white-space: nowrap;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  height: 100%;
  background: ${(props: { theme: { primaryLight: any } }) =>
    props.theme.primaryLight};
  white-space: nowrap;
  word-break: keep-all;
  border-radius: 5px;
  font-size: 0.875rem;
`;

const Background = styled.div`
  display: inline;
  overflow: visible;
`;

const Marquee = () => {
  const {
    ui: { marquees },
  } = useUiStore();

  const hasData = marquees && marquees.length > 0;

  return (
    <Container>
      <img src={notification} alt="marquee" />
      {hasData && (
        // Disable TypeScript check for unknown HTML elements
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        <marquee>
          {marquees.map((item, index) => {
            const content = `
              *${
                item.localization !== null && item.localization.content
                  ? item.localization.content
                  : item.content
              }
              `;
            return <Background key={index}>{content}</Background>;
          })}
        </marquee>
      )}
    </Container>
  );
};

export default Marquee;
