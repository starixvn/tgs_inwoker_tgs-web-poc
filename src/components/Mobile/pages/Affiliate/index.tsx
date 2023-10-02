import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import AffiliateDialog from "@/components/Mobile/pages/Affiliate/AffiliateDialog";

type Props = {};
const Affiliate = (props: Props) => {
  const [isOpen, setIsOpen] = useState(true);
  const history = useHistory();

  const handleCloseDialog = useCallback(() => {
    setIsOpen(false);
    history.goBack();
  }, []);

  return (
    <AffiliateDialog isOpen={isOpen} handleCloseDialog={handleCloseDialog} />
  );
};

export default Affiliate;
