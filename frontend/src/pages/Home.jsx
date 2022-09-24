import Header from "../components/Header";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import Featured from "../components/Featured";
import PropertyList from "../components/PropertyList";
import FeaturedProperty from "../components/FeaturedProperty";
import MailList from "../components/MailList";
import Footer from "../components/footer/Footer";
import NewsLetter from "../components/newsLetter/NewsLetter";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const HomeContainer = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

const PropertyHeading = styled.h1`
  width: 1024px;
  font-size: 20px;
`;

const Home = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const popUp = async () => {
      setTimeout(() => {
        setModalOpen(true);
      }, 5000);
    };

    if (!user) popUp();
  }, []);

  return (
    <div>
      <Navbar />
      <Header />
      <HomeContainer>
        <Featured />
        <PropertyHeading>Browse by property type</PropertyHeading>
        <PropertyList />
        <PropertyHeading>Browse by property type</PropertyHeading>
        <FeaturedProperty />
        <MailList />
        <Footer />
      </HomeContainer>
      {modalOpen && <NewsLetter modalState={setModalOpen} />}
    </div>
  );
};
export default Home;
