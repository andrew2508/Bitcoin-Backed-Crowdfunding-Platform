# 💸 Crowdfunding On-Chain

## 📜 Project Description

This project is a decentralized **crowdfunding platform** implemented entirely on-chain using the **Clarity** smart contract language and deployed on the **Stacks Testnet**. It enables project creators to launch funding campaigns with clear goals and deadlines, while contributors can transparently pledge STX tokens with full confidence that the logic is enforced by the blockchain.

The contract autonomously handles project creation, STX pledging, funding goal tracking, refunding failed campaigns, and fund claiming upon success — **all without centralized servers or intermediaries.**

---

## 🔭 Project Vision

The vision for this project is to **reimagine crowdfunding with transparency, accountability, and decentralization.** By leveraging the power of smart contracts, this platform ensures trustless fund management and automates campaign outcomes based on verifiable logic.

Goals include:

* Demonstrating the power of Clarity for financial and utility-based decentralized apps.
* Enabling project owners to engage with their communities transparently.
* Creating a framework for trust-minimized fundraising, scalable to multiple campaigns or creators.

---

## ⭐ Key Features

* ✅ **Campaign Initialization:** Project owner can set a funding goal and deadline via `init-owner`.
* 💰 **STX Pledging:** Contributors can pledge STX to the campaign with safety guarantees.
* ⏳ **Deadline Enforcement:** Pledges are accepted only until a blockchain-based deadline.
* 📈 **Funding Goal Tracking:** Automatically marks the campaign as successful if the target is reached.
* 🔁 **Refunds:** Contributors can reclaim their funds if the campaign fails after the deadline.
* 🏆 **Fund Claiming:** Owner can claim the funds only if the campaign is successful and deadline passed.
* 🔐 **Immutable Logic:** All state (pledges, ownership, campaign status) is stored and enforced on-chain.

---

## 🚀 Future Scope

* 🌐 **Multi-Campaign Support:** Allow multiple campaigns from various owners within the same contract.
* 🎨 **Front-end UI:** Build a user-friendly interface using React + Stacks.js to interact with the contract.
* 🔍 **Transparency Dashboard:** Visualize total pledges, backer list, and campaign status in real time.
* 🧪 **Automated Testing:** Implement full test coverage using Clarinet to ensure smart contract reliability.
* 🧾 **Backer Proof NFTs:** Mint NFTs for supporters as proof of contribution.
* 🛡️ **Security Auditing:** Perform formal audits and add safe math libraries to prevent overflows.
* 💬 **Supporter Communication:** Add on-chain metadata/messages to communicate campaign updates.

---

## 📄 Contract Details

Deployed contract address:
`ST3XR9JJR0H42B2GPGW36YS302ZR67N0YJ6W90ME5.Newcrowdfunding`
<img width="1860" height="847" alt="image" src="https://github.com/user-attachments/assets/4b39589f-952f-487f-ba66-e58b78a5a12e" />

> *Note: Replace this with your real contract address if different.*


Nếu bạn đã có giao diện hoặc muốn thêm hướng dẫn deploy/test contract bằng Clarinet hoặc frontend với Stacks.js, mình có thể viết tiếp phần đó cho bạn.
