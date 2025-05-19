const contractAddress = "0xYourContractAddressHere"; // Thay bằng địa chỉ hợp đồng thật
const abi = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "getBalance",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "_amount", "type": "uint256" }],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "stateMutability": "payable",
    "type": "receive"
  }
];

let provider, signer, contract;

async function connectWallet() {
  if (!window.ethereum) {
    alert("Vui lòng cài MetaMask!");
    return;
  }

  provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  signer = provider.getSigner();
  const account = await signer.getAddress();
  document.getElementById("account").innerText = "Địa chỉ ví: " + account;
  contract = new ethers.Contract(contractAddress, abi, signer);
  getBalance();
}

async function getBalance() {
  const balance = await contract.getBalance();
  document.getElementById("balance").innerText = ethers.utils.formatEther(balance) + " ETH";
}

async function deposit() {
  const amount = document.getElementById("depositAmount").value;
  const tx = await signer.sendTransaction({
    to: contractAddress,
    value: ethers.utils.parseEther(amount)
  });
  await tx.wait();
  alert("Gửi thành công!");
  getBalance();
}

async function withdraw() {
  const amount = document.getElementById("withdrawAmount").value;
  try {
    const tx = await contract.withdraw(ethers.utils.parseEther(amount));
    await tx.wait();
    alert("Rút thành công!");
    getBalance();
  } catch (err) {
    alert("Không thể rút: Có thể bạn không phải owner hoặc lỗi khác.");
    console.error(err);
  }
}
