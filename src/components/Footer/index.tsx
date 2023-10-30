import SocialMedia from "@/components/SocialMedia";
import config from "@/config/config";
import { useGeneralStore } from "@/hooks/stores/useGeneralStore";
import { media } from "@/theme/breakpoints";
import styled from "styled-components";

const FooterContainer = styled.div`
  display: none;

  ${media.sm} {
    width: 100%;
    background: ${({ theme }) => theme.primaryLight};
    color: ${({ theme }) => theme.white};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 30px;
  }
`;

const FooterGroups = styled.div`
  width: 100%;
  display: flex;
  max-width: 830px;
  gap: 20px;
  margin-bottom: 20px;
`;

const FooterGroup = styled.div`
  min-width: 28%;
`;

const GroupTitle = styled.h6`
  font-size: 1.25rem;
  line-height: 0.875rem;
  font-weight: 500;
  margin-bottom: 20px;
`;

const GroupContent = styled.div`
  font-size: 0.875rem;
  line-height: 1.025rem;
  font-weight: 400;
  margin-bottom: 10px;
`;

const PartnersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 11px;
`;

const ParnterBadge = styled.div`
  padding: 8px 16px;
  border-radius: 50px;
  border: 1px solid white;
  font-size: 0.875rem;

  ${media.md} {
    padding: 10px 20px;
  }
`;

const SocialMediaTitle = styled.h6`
  font-size: 1.25rem;
  line-height: 0.875rem;
  font-weight: 500;
`;

const PartnerList = [
  "Red Tiger",
  "EVOLUTION",
  "SV388",
  "Saba Sports",
  "BTi",
  "365 Cards",
  "PG Soft",
  "KY",
];

type Props = {};
const Footer = (props: Props) => {
  const { general } = useGeneralStore();

  const brand = config.brand;
  return (
    <FooterContainer>
      <FooterGroups>
        {/*<FooterGroup>*/}
        {/*  <LogoImg src={general.brand && general.brand.loadingUrl} />*/}
        {/*</FooterGroup>*/}

        <FooterGroup>
          <GroupTitle>Gaming License</GroupTitle>
          <GroupContent>{`${brand} Copyright© 2020 ${brand} Casino `}</GroupContent>
          <GroupContent>Co.Group</GroupContent>
          <GroupContent>All Rights Reserved</GroupContent>
          <GroupContent>V1.1.3795703</GroupContent>
        </FooterGroup>

        <FooterGroup>
          <GroupTitle>Quick Links</GroupTitle>
          <GroupContent>24/7 Customer Service</GroupContent>
          <GroupContent>FAQs</GroupContent>
          <GroupContent>Privacy Policy</GroupContent>
          <GroupContent>Terms and Conditions</GroupContent>
          <GroupContent>Responsible Gaming</GroupContent>
        </FooterGroup>

        <FooterGroup>
          <GroupTitle>Partners</GroupTitle>
          <PartnersContainer>
            {PartnerList.map((partner) => {
              return <ParnterBadge key={partner}>{partner}</ParnterBadge>;
            })}
          </PartnersContainer>
        </FooterGroup>
      </FooterGroups>

      <SocialMediaTitle>Follow Us</SocialMediaTitle>
      <SocialMedia />
    </FooterContainer>
  );
};

export default Footer;
