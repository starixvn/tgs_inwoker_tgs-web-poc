import React, { useEffect, useState } from "react";
import BottomScrollListener from "react-bottom-scroll-listener";
import Loading from "@/components/UI/Loading";
import i18n from "@/utils/i18n";
import { useAccountStore } from "@/hooks/stores/useAccountStore";
import { useInboxStore } from "@/hooks/stores/useInboxStore";
import { useAuth } from "@/hooks/auth/useAuth";
import styled from "styled-components";
import { useRwd } from "@/hooks/useRwd";
import MobileInboxList from "@/domain/Account/Inbox/components/MobileInboxList";
import DesktopInboxList from "@/domain/Account/Inbox/components/DesktopInboxList";

const Inbox = () => {
  const { isLogin } = useAuth();
  const { account } = useAccountStore();
  const { inbox, token } = account;
  const { getMessages, setMessageRead } = useInboxStore();

  const [isEdit, setIsEdit] = useState(false);
  const [limit] = useState(10);
  const [page, setPage] = useState(0);
  const [isBottom, setIsBottom] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectedGuid, setSelectedGuid] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState(false);
  const { isDesktopSize } = useRwd();

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
    if (!isEdit) {
      setMessageRead([id]).then((response) => {
        getMessages(i18n.language, 1, 99, true, true);
      });

      setView(true);
    }
  };

  const handleCheckboxClick = (subjectID: string, guid: string) => {
    let updatedSelected = [...selectedIds];
    let updatedSelectedGuid = [...selectedGuid];

    if (selectedIds.includes(subjectID)) {
      updatedSelected = updatedSelected.filter((item) => item !== subjectID);
      updatedSelectedGuid = updatedSelectedGuid.filter((item) => item !== guid);
    } else {
      updatedSelected.push(subjectID);
      updatedSelectedGuid.push(guid);
    }

    setSelectedIds(updatedSelected);
    setSelectedGuid(updatedSelectedGuid);
  };

  return (
    <>
      {isDesktopSize ? (
        <DesktopInboxList
          inboxMessageList={inbox?.items || []}
          selectedIds={selectedIds}
          isEdit={isEdit}
          handleCheckboxClick={handleCheckboxClick}
          handleItemClick={handleItemClick}
          totalCount={inbox?.totalcount || 0}
        />
      ) : (
        <MobileInboxList
          inboxMessageList={inbox?.items || []}
          selectedIds={selectedIds}
          isEdit={isEdit}
          handleCheckboxClick={handleCheckboxClick}
          handleItemClick={handleItemClick}
        />
      )}

      <BottomScrollListener onBottom={handleScrollBottom} />

      <Loading show={loading} />
    </>
  );
};

export default Inbox;
