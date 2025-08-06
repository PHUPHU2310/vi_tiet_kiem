const provider = new ethers.providers.Web3Provider(window.ethereum);
let signer;
let contract;

const CONTRACT_ADDRESS = "YOUR_CONTRACT_ADDRESS";
const ABI = [
  "function deposit() public payable",
  "function withdraw(uint256 amount) public",
  "function getBalance() public view returns (uint256)"
];

async function connectWallet() {
  try {
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();
    contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
    document.getElementById("status").innerText = "✅ Đã kết nối MetaMask";
    getBalance();
  } catch (err) {
    document.getElementById("status").innerText = "❌ Lỗi kết nối MetaMask";
  }
}

async function getBalance() {
  try {
    const balance = await contract.getBalance();
    document.getElementById("balance").innerText = `${ethers.utils.formatEther(balance)} ETH`;
  } catch (err) {
    document.getElementById("balance").innerText = "Lỗi đọc số dư";
  }
}

function isValidAmount(value) {
  const num = parseFloat(value);
  return !isNaN(num) && num > 0;
}

async function depositETH() {
  const amount = document.getElementById("depositAmount").value;
  if (!isValidAmount(amount)) {
    document.getElementById("status").innerText = "❌ Nhập số dương hợp lệ";
    return;
  }
  try {
    const tx = await contract.deposit({ value: ethers.utils.parseEther(amount) });
    await tx.wait();
    document.getElementById("status").innerText = "✅ Nạp thành công";
    getBalance();
  } catch (err) {
    document.getElementById("status").innerText = "❌ Giao dịch thất bại";
  }
}

async function withdrawETH() {
  const amount = document.getElementById("withdrawAmount").value;
  if (!isValidAmount(amount)) {
    document.getElementById("status").innerText = "❌ Nhập số dương hợp lệ";
    return;
  }
  try {
    const tx = await contract.withdraw(ethers.utils.parseEther(amount));
    await tx.wait();
    document.getElementById("status").innerText = "✅ Rút thành công";
    getBalance();
  } catch (err) {
    document.getElementById("status").innerText = "❌ Giao dịch thất bại (có thể bạn không phải chủ sở hữu)";
  }
}
