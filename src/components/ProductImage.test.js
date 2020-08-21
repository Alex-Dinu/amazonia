import React from "react";
import renderer from "react-test-renderer";
import ProductImage from "./ProductImage";

describe("The ProductImage component", () => {
  it("renders as expected", () => {
    const tree = renderer
      .create(
        <ProductImage
          imageSource={"imageSourcePath"}
          altText={"image alt text"}
        ></ProductImage>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
