import React, { useEffect, useState } from "react";
import BottomScrollListener from "react-bottom-scroll-listener";
import Loading from "@/components/UI/Loading";
import i18n from "@/utils/i18n";
import { useAccountStore } from "@/hooks/stores/useAccountStore";
import { useInboxStore } from "@/hooks/stores/useInboxStore";
import InboxItem from "./InboxItem";
import { InboxMessage } from "@/types/stores/account";
import { useAuth } from "@/hooks/auth/useAuth";
import styled from "styled-components";

const InboxListContainer = styled.div`
  & > div {
    margin-bottom: 10px;
  }
`;

const Inbox = () => {
  const { isLogin } = useAuth();
  const { account } = useAccountStore();
  const { inbox, token } = account;
  const { getMessages, setMessageRead } = useInboxStore();

  const [edit, setEdit] = useState(false);
  const [limit] = useState(10);
  const [page, setPage] = useState(0);
  const [isBottom, setIsBottom] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [selectedGuid, setSelectedGuid] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState(false);

  const getMessageList = async (page: number, isNew: boolean = false) => {
    setLoading(true);
    await getMessages(i18n.language, page + 1, limit, isNew);
    setLoading(false);
  };

  useEffect(() => {
    if (isLogin) {
      getMessageList(0, true);
    }
  }, [token]);

  const handleScrollBottom = () => {
    if (!isBottom) {
      if (inbox.items.length < inbox.totalcount) {
        getMessageList(page + 1);
        setPage(page + 1);
        setIsBottom(true);
      }
    }
  };

  const handleItemClick = (id: string) => {
    if (!edit) {
      setMessageRead([id]).then((response) => {
        getMessages(i18n.language, 1, 99, true, true);
      });

      setView(true);
    }
  };

  const handleCheckboxClick = (SubjectID: string, GUID: string) => {
    let updatedSelected = [...selected];
    let updatedSelectedGuid = [...selectedGuid];

    if (selected.includes(SubjectID)) {
      updatedSelected = updatedSelected.filter((item) => item !== SubjectID);
      updatedSelectedGuid = updatedSelectedGuid.filter((item) => item !== GUID);
    } else {
      updatedSelected.push(SubjectID);
      updatedSelectedGuid.push(GUID);
    }

    setSelected(updatedSelected);
    setSelectedGuid(updatedSelectedGuid);
  };

  return (
    <>
      <InboxListContainer>
        {inbox
          ? inbox.items.map((inboxMessage: InboxMessage, index: number) => {
              return (
                <InboxItem
                  key={index}
                  row={inboxMessage}
                  selected={selected}
                  edit={edit}
                  handleCheckboxClick={handleCheckboxClick}
                  handleItemClick={handleItemClick}
                />
              );
            })
          : null}
      </InboxListContainer>
      <BottomScrollListener onBottom={handleScrollBottom} />

      <Loading show={loading} />
    </>
  );
};

export default Inbox;
