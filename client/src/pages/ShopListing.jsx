import React, { useEffect, useState } from "react";
import ProductCard from "../components/cards/ProductCard";
import styled from "styled-components";
import { category, filter } from "../utils/data";
import { CircularProgress, Slider } from "@mui/material";
import { getAllProducts } from "../api";

const Container = styled.div`
  padding: 20px 30px;
  height: 100vh;
  overflow-y: hidden;
  display: flex;
  align-items: center;
  gap: 30px;
  @media (max-width: 768px) {
    padding: 20px 12px;
    flex-direction: column;
    overflow-y: scroll;
  }
  background: ${({ theme }) => theme.bg};
`;
const Filters = styled.div`
  width: 100%;
  height: fit-content;
  overflow-y: hidden;
  padding: 20px 16px;
  @media (min-width: 768px) {
    height: 100%;
    width: 230px;
    overflow-y: scroll;
  }
`;
const FilterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 12px;
`;
const Title = styled.div`
  font-size: 20px;
  font-weight: 500;
`;
const Menu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
const Products = styled.div`
  padding: 12px;
  overflow: hidden;
  height: fit-content;
  @media (min-width: 768px) {
    width: 100%;
    overflow-y: scroll;
    height: 100%;
  }
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

const Item = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const SelectableItem = styled.div`
  cursor: pointer;
  display: flex;
  border: 1px solid ${({ theme }) => theme.text_secondary + 50};
  color: ${({ theme }) => theme.text_secondary + 90};
  border-radius: 8px;
  padding: 2px 8px;
  font-size: 16px;
  width: fit-content;
  ${({ selected, theme }) =>
    selected &&
    `
  border: 1px solid ${theme.text_primary};
  color: ${theme.text_primary};
  background: ${theme.text_primary + 30};
  font-weight: 500;
  `}
`;

const ShopListing = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedSizes, setSelectedSizes] = useState(["S", "M", "L", "XL"]); // Default selected sizes
  const [selectedCategories, setSelectedCategories] = useState([
    "Men",
    "Women",
    "Kids",
    "Bags",
  ]); // Default selected categories

  const getFilteredProductsData = async () => {
    setLoading(true);
    // Call the API function for filtered products
    await getAllProducts(
      `minPrice=${priceRange[0]}&maxPrice=${priceRange[1]}${
        selectedSizes.length > 0 ? `&sizes=${selectedSizes.join(",")}` : ""
      }${
        selectedCategories.length > 0
          ? `&categories=${selectedCategories.join(",")}`
          : ""
      }`
    ).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    getFilteredProductsData();
  }, [priceRange, selectedSizes, selectedCategories]);
  return (
    <Container>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Filters>
            <Menu>
              {filter.map((filters) => (
                <FilterSection>
                  <Title>{filters.name}</Title>
                  {filters.value === "price" ? (
                    <>
                      <Slider
                        aria-label="Price"
                        defaultValue={priceRange}
                        min={0}
                        max={1000}
                        valueLabelDisplay="auto"
                        marks={[
                          { value: 0, label: "$0" },
                          { value: 1000, label: "$1000" },
                        ]}
                        onChange={(e, newValue) => setPriceRange(newValue)}
                      />
                    </>
                  ) : filters.value === "size" ? (
                    <Item>
                      {filters.items.map((item) => (
                        <SelectableItem
                          key={item}
                          selected={selectedSizes.includes(item)}
                          onClick={() =>
                            setSelectedSizes((prevSizes) =>
                              prevSizes.includes(item)
                                ? prevSizes.filter(
                                    (category) => category !== item
                                  )
                                : [...prevSizes, item]
                            )
                          }
                        >
                          {item}
                        </SelectableItem>
                      ))}
                    </Item>
                  ) : filters.value === "category" ? (
                    <Item>
                      {filters.items.map((item) => (
                        <SelectableItem
                          key={item}
                          selected={selectedCategories.includes(item)}
                          onClick={() =>
                            setSelectedCategories((prevCategories) =>
                              prevCategories.includes(item)
                                ? prevCategories.filter(
                                    (category) => category !== item
                                  )
                                : [...prevCategories, item]
                            )
                          }
                        >
                          {item}
                        </SelectableItem>
                      ))}
                    </Item>
                  ) : null}
                </FilterSection>
              ))}
            </Menu>
          </Filters>
          <Products>
            <CardWrapper>
              {products?.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </CardWrapper>
          </Products>
        </>
      )}
    </Container>
  );
};

export default ShopListing;
