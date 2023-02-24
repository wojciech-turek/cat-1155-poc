// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol";

/// @dev This is a slightly copy of the OpenZeppelin ERC2771ContextUpgradeable contract
/// that enables changing the trusted forwarder address

contract ERC2711Upgradeable is Initializable, ContextUpgradeable {
    address internal _trustedForwarder;

    function isTrustedForwarder(address forwarder) public view returns (bool) {
        return forwarder == _trustedForwarder;
    }

    function __ERC2711Upgradeable_init(address trustedForwarder)
        internal
        onlyInitializing
    {
        __Context_init_unchained();
        __ERC2711Upgradeable_init_unchained(trustedForwarder);
    }

    function __ERC2711Upgradeable_init_unchained(address trustedForwarder)
        internal
        onlyInitializing
    {
        _trustedForwarder = trustedForwarder;
    }

    function _msgSender()
        internal
        view
        virtual
        override
        returns (address sender)
    {
        if (isTrustedForwarder(msg.sender)) {
            // The assembly code is more direct than the Solidity version using `abi.decode`.
            /// @solidity memory-safe-assembly
            assembly {
                sender := shr(96, calldataload(sub(calldatasize(), 20)))
            }
        } else {
            return super._msgSender();
        }
    }

    function _msgData()
        internal
        view
        virtual
        override
        returns (bytes calldata)
    {
        if (isTrustedForwarder(msg.sender)) {
            return msg.data[:msg.data.length - 20];
        } else {
            return super._msgData();
        }
    }
}
