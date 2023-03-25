// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Products {
  struct Product {
    string id;
    string name;
    uint256 price;
  }

  Product[] public products;

  function addProduct(string memory id, string memory name, uint256 price) public {
    products.push(Product(id, name, price));
  }

  function getProductsCount() public view returns (uint256) {
    return products.length;
  }

  function getProduct(uint256 index) public view returns (string memory id, string memory, uint256) {
    Product storage product = products[index];
    return (product.id, product.name, product.price);
  }
}

