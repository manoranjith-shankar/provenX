//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract supplychain {
    struct Product {
        string name;
        uint price;
        uint batchId;
        string productDescription;
        address owner;
        string manufacturerId;
    }

    struct ProductEvent {
        uint timestamp;
        string description;
        address from;
        address to;
        string newOwnerType;
        string newOwnerId;
    }

    mapping(string => Product[]) manufacturerProducts; // stores all the products for each manufacturer
    mapping(string => Product) products; // stores all the products in the chain
    mapping(string => ProductEvent[]) productEvents; // stores the timeline for each product
    mapping(string => uint[]) productTimelineKeys; // stores the timeline keys for each product
    event ProductAdded(string indexed id, string name, uint price, uint batchId, string productDescription, address owner, string manufacturerId);
    event Success(string message);

    function addProduct(string memory id, string memory name, uint price, uint batchId, string memory productDescription, string memory manufacturerId) public {
        require(products[id].owner == address(0), "Product ID already exists");
        products[id] = Product(name, price, batchId, productDescription, msg.sender, manufacturerId);
        manufacturerProducts[manufacturerId].push(products[id]);
        emit ProductAdded(id, name, price, batchId, productDescription, msg.sender, manufacturerId);
        emit Success("Product added successfully.");
    }

    function getProductInfo(string memory id) public view returns (Product memory) {
        Product storage product = products[id];
        require(product.owner != address(0), "Product with this ID does not exist");
        return product;
    }

    function getProducts(string memory manufacturerId) public view returns (string[] memory, uint) {
    Product[] storage productList = manufacturerProducts[manufacturerId];
    require(productList.length > 0, "Manufacturer does not have any products");

    string[] memory batchIds = new string[](productList.length);
    for (uint i = 0; i < productList.length; i++) {
        batchIds[i] = uint2str(productList[i].batchId);
    }

    return (batchIds, productList.length);
    }

    function uint2str(uint256 _i) private pure returns (string memory) {
        if (_i == 0) {
            return "0";
        }
        uint256 j = _i;
        uint256 length;
        while (j != 0) {
            length++;
            j /= 10;
        }
        bytes memory bstr = new bytes(length);
        uint256 k = length;
        while (_i != 0) {
            k = k-1;
            uint8 temp = uint8(48 + _i % 10);
            bytes1 b1 = bytes1(temp);
            bstr[k] = b1;
            _i /= 10;
        }
        return string(bstr);
    }

    function transferOwnership(string memory id, string memory newOwnerType, address newOwner, string memory newOwnerId) public {
        Product storage product = products[id];
        require(product.owner == msg.sender, "Only the product owner can transfer ownership");
        require(newOwner != address(0), "Invalid new owner address");
        require(isValidNewOwnerType(newOwnerType), "Invalid new owner type");
        product.owner = newOwner;

        // Create new ProductEvent
        ProductEvent memory eventToAdd = ProductEvent({
            timestamp: block.timestamp,
            description: "Ownership transferred",
            from: msg.sender,
            to: newOwner,
            newOwnerType: newOwnerType,
            newOwnerId: newOwnerId
        });

        // Add ProductEvent to timeline
        productEvents[id].push(eventToAdd);
        productTimelineKeys[id].push(productEvents[id].length - 1);
    }

    function getProductTimeline(string memory id) public view returns (uint[] memory, string[] memory, string[] memory, address[] memory, uint[] memory) {
    uint[] storage timelineKeys = productTimelineKeys[id];
    ProductEvent[] storage timelineEvents = productEvents[id];

    uint[] memory timestamps = new uint[](timelineEvents.length);
    string[] memory descriptions = new string[](timelineEvents.length);
    string[] memory newOwnerTypes = new string[](timelineEvents.length);
    address[] memory owners = new address[](timelineEvents.length);

    for (uint i = 0; i < timelineEvents.length; i++) {
        timestamps[i] = timelineEvents[i].timestamp;
        descriptions[i] = timelineEvents[i].description;
        newOwnerTypes[i] = timelineEvents[i].newOwnerType;
        owners[i] = timelineEvents[i].to;
    }

    return (timelineKeys, descriptions, newOwnerTypes, owners, timestamps);
    }


    function isValidNewOwnerType(string memory newOwnerType) private pure returns (bool) {
        string[4] memory validNewOwnerTypes = ["manufacturer","retailer", "distributor", "consumer"];
        for (uint i = 0; i < validNewOwnerTypes.length; i++) {
            if (keccak256(abi.encodePacked(validNewOwnerTypes[i])) == keccak256(abi.encodePacked(newOwnerType))) {
                return true;
            }
        }
        return false;
    }
    }