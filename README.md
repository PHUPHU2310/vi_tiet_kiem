💰 Ví Tiết Kiệm Cá Nhân Trên Blockchain

🚀 Giới thiệu
Đây là một dự án ví tiết kiệm cá nhân được xây dựng trên nền tảng Blockchain Ethereum. Ứng dụng sử dụng hợp đồng thông minh (smart contract) để thực hiện các giao dịch gửi, rút tiền một cách minh bạch, an toàn và phi tập trung. Giao diện người dùng tích hợp MetaMask giúp tương tác trực tiếp với ví trên trình duyệt.

🛠️ Công nghệ sử dụng
- **Ngôn ngữ hợp đồng:** Solidity
- **IDE phát triển hợp đồng:** Remix IDE
- **Mạng blockchain:** Sepolia Testnet
- **Thư viện kết nối:** Web3.js
- **Giao diện:** HTML/CSS/JavaScript
- **Ví người dùng:** MetaMask

🎯 Tính năng chính
- ✅ Tạo ví tiết kiệm cá nhân.
- ✅ Gửi ETH vào ví thông qua MetaMask.
- ✅ Rút ETH về tài khoản cá nhân.
- ✅ Xem số dư ví.
- ✅ Theo dõi lịch sử giao dịch trên blockchain (Sepolia Explorer).

 📦 Cấu trúc dự án

![cấu trúc thư mục](https://github.com/user-attachments/assets/6e144e7a-573b-4bf4-a550-1f930b5e5c8c)


🔗 Kết nối và triển khai

1. Cài đặt **MetaMask** và chọn mạng **Sepolia Testnet**.
2. Deploy hợp đồng trong **Remix IDE** bằng tài khoản có ETH test.
3. Lấy địa chỉ hợp đồng và ABI dán vào `script.js`.
4. Mở `index.html` để truy cập giao diện ví tiết kiệm.
5. Thực hiện nạp và rút ETH từ ví cá nhân.

![giao diện ví cá nhân](https://github.com/user-attachments/assets/c466340e-1fa5-4679-ba84-c4753110bd89)

![giao diện giao dịch](https://github.com/user-attachments/assets/a3b6ac50-94bb-4faf-a17c-fbc1acb2e9b9)


📜 Smart Contract (SavingsWallet.sol)

![smart contract](https://github.com/user-attachments/assets/8f4fed0a-4d32-45fe-9648-30f6cc1467ac)



🔒 Bảo mật & Lưu ý
Chỉ chủ sở hữu ví (người deploy hợp đồng) mới có quyền rút tiền.
Ví hoạt động trên Sepolia, KHÔNG sử dụng ví chính trên mạng thật.
Hợp đồng đã kiểm tra đơn giản, chưa triển khai cơ chế phân quyền nâng cao.
