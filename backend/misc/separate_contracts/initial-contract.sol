//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Manufacturer {
    struct Product {
        string name;
        uint price;
        string productDescription;
        address owner;
    }

    struct ProductEvent {
        uint timestamp;
        string description;
        address from;
        address to;
        string newOwnerType;
    }


    mapping(string => Product) products; // stores all the products in the chain
    mapping(string => ProductEvent[]) productEvents; // stores the timeline for each product
    mapping(string => uint[]) productTimelineKeys; // stores the timeline keys for each product
    event ProductAdded(string indexed id, string name, uint price, string productDescription, address owner);
    event Success(string message);

    function addProduct(string memory id, string memory name, uint price, string memory productDescription) public {
        require(products[id].owner == address(0), "Product ID already exists");
        products[id] = Product(name, price, productDescription, msg.sender);
        emit ProductAdded(id, name, price, productDescription, msg.sender);
        emit Success("Product added successfully.");
    }

    function getProductInfo(string memory id) public view returns (Product memory) {
    Product storage product = products[id];
    require(product.owner != address(0), "Product with this ID does not exist");
    return product;
    }

 
    function transferOwnership(string memory id, string memory newOwnerType, address newOwner) public {
    Product storage product = products[id];
    require(product.owner == msg.sender, "Only the product owner can transfer ownership");
    require(newOwner != address(0), "Invalid new owner address");
    require(isValidNewOwnerType(newOwnerType), "Invalid new owner type");
    product.owner = newOwner;
    }

    function getProductTimeline(string memory id) public view returns (uint[] memory, string[] memory) {
    Product storage product = products[id];
    uint[] storage timelineKeys = productTimelineKeys[id];
    ProductEvent[] storage timelineEvents = productEvents[id];

    uint[] memory timestamps = new uint[](timelineEvents.length);
    string[] memory descriptions = new string[](timelineEvents.length);

    for (uint i = 0; i < timelineEvents.length; i++) {
        timestamps[i] = timelineEvents[i].timestamp;
        descriptions[i] = timelineEvents[i].description;
    }

    return (timestamps, descriptions);
    }

    
    function isValidNewOwnerType(string memory newOwnerType) private pure returns (bool) {
        string[3] memory validNewOwnerTypes = ["retailer", "distributor", "consumer"];
        for (uint i = 0; i < validNewOwnerTypes.length; i++) {
            if (keccak256(abi.encodePacked(validNewOwnerTypes[i])) == keccak256(abi.encodePacked(newOwnerType))) {
                return true;
            }
        }
        return false;
    }
}
