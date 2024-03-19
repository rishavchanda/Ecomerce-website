import React, { useEffect, useState } from "react";
import styled from "styled-components";
import HeaderImage from "../utils/Images/Header.png";
import { category } from "../utils/data";
import ProductCategoryCard from "../components/cards/ProductCategoryCard";
import ProductCard from "../components/cards/ProductCard";
import { getAllProducts } from "../api";

const Container = styled.div`
  padding: 20px 30px;
  padding-bottom: 200px;
  height: 100%;
  overflow-y: scroll;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 30px;
  @media (max-width: 768px) {
    padding: 20px 12px;
  }
  background: ${({ theme }) => theme.bg};
`;
const Section = styled.div`
  max-width: 1400px;
  padding: 32px 16px;
  display: flex;
  flex-direction: column;
  gap: 28px;
`;
const Img = styled.img`
  width: 90%;
  height: 700px;
  object-fit: cover;
  max-width: 1200px;
`;

const Title = styled.div`
  font-size: 28px;
  font-weight: 500;
  display: flex;
  justify-content: ${({ center }) => (center ? "center" : "space-between")};
  align-items: center;
`;

const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;
  @media (max-width: 750px) {
    gap: 14px;
  }
`;

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    setLoading(true);
    await getAllProducts().then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <Container>
      <Section
        style={{
          alignItems: "center",
        }}
      >
        <Img src={HeaderImage} />
      </Section>
      <Section>
        <Title>Shop by Categories</Title>
        <CardWrapper>
          {category.map((category) => (
            <ProductCategoryCard category={category} />
          ))}
        </CardWrapper>
      </Section>
      <Section>
        <Title center>Our Bestseller</Title>
        <CardWrapper>
          {products.map((product) => (
            <ProductCard product={product} />
          ))}
        </CardWrapper>
      </Section>
    </Container>
  );
};

export default Home;
