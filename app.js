vconst CONTRACT_ADDRESS = "0x0C85940906Ac957476ce757520B8bdf3b6cf8C9";
const ABI = [
  "function deposit() public payable",
  "function withdraw(uint256 amount) public",
  "function getBalance() public view returns (uint256)"
];

let provider;
let signer;
let contract;

async function connectWallet() {
  if (typeof window.ethereum !== "undefined") {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      provider = new ethers.providers.Web3Provider(window.ethereum);
      signer = provider.getSigner();
      contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

      const address = await signer.getAddress();
      document.getElementById("connectButton").innerText = "✅ Đã kết nối: " + address.slice(0, 6) + "..." + address.slice(-4);
      document.getElementById("error").innerText = "";
      updateBalance();
    } catch (err) {
      document.getElementById("error").innerText = "❌ Lỗi khi kết nối: " + err.message;
    }
  } else {
    document.getElementById("error").innerText = "❌ Trình duyệt không hỗ trợ MetaMask!";
  }
}

async function updateBalance() {
  if (!contract) return;

  try {
    const balance = await contract.getBalance();
    document.getElementById("balance").innerText =
      `Số dư hợp đồng: ${ethers.utils.formatEther(balance)} ETH`;
  } catch (err) {
    document.getElementById("error").innerText = "❌ Không thể lấy số dư: " + err.message;
  }
}

async function deposit() {
  const amount = document.getElementById("depositAmount").value;
  if (!isValidAmount(amount)) {
    document.getElementById("error").innerText = "❌ Vui lòng nhập số dương hợp lệ để nạp!";
    return;
  }

  try {
    const tx = await contract.deposit({
      value: ethers.utils.parseEther(amount)
    });
    await tx.wait();
    document.getElementById("error").innerText = "✅ Nạp thành công!";
    updateBalance();
  } catch (err) {
    document.getElementById("error").innerText = "❌ Gửi thất bại: " + err.message;
  }
}

async function withdraw() {
  const amount = document.getElementById("withdrawAmount").value;
  if (!isValidAmount(amount)) {
    document.getElementById("error").innerText = "❌ Vui lòng nhập số dương hợp lệ để rút!";
    return;
  }

  try {
    const tx = await contract.withdraw(ethers.utils.parseEther(amount));
    await tx.wait();
    document.getElementById("error").innerText = "✅ Rút thành công!";
    updateBalance();
  } catch (err) {
    document.getElementById("error").innerText = "❌ Rút thất bại: " + err.message;
  }
}

function isValidAmount(amount) {
  return !isNaN(amount) && Number(amount) > 0;
}
