import favorite from "@/assets/images/home/mobile/tab/favorite.svg";
import { useState } from "react";
import styled from 'styled-components';
import Tag from "./tag";

const tagList = [
    {
        key: "all",
        iconUrl: "",
        text: "All"
    },
    {
        key: "favorite",
        iconUrl: favorite,
        text: "Favorite",
    },
    {
        key: "PP",
        iconUrl: "",
        text: "PP"
    },
    {
        key: "AG",
        iconUrl: "",
        text: "AG"
    },
    {
        key: "LO",
        iconUrl: "",
        text: "LO"
    },
    {
        key: "GD",
        iconUrl: "",
        text: "GD"
    },
]

const Container = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    overflow-x: auto;
    white-space: nowrap;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
    /* Enable smooth scrolling on iOS */
`;

const TagContainer = () => {
    const [selectedTag, setSelectedTag] = useState("All");
    const handleClick = (item: string) => {
        setSelectedTag(item);
    };

    return (
        <Container>
            {tagList.map(item => (
                <Tag
                    key={item.key}
                    imageUrl={item.iconUrl}
                    text={item.text}
                    isActive={item.text === selectedTag}
                    onClick={() => handleClick(item.text)} fontSize={"small"} />
            ))}
        </Container>
    );
};

export default TagContainer;
