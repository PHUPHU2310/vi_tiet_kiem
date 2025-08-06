let web3;

async function connectWallet() {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    alert("Kết nối MetaMask thành công");
  } else {
    alert("Vui lòng cài MetaMask!");
  }
}

async function getBalance() {
  const accounts = await web3.eth.getAccounts();
  const balanceWei = await web3.eth.getBalance(accounts[0]);
  const balanceEth = web3.utils.fromWei(balanceWei, 'ether');
  document.getElementById("balance").innerText = parseFloat(balanceEth).toFixed(4);
}

async function depositETH() {
  const accounts = await web3.eth.getAccounts();
  const value = web3.utils.toWei(document.getElementById("depositAmount").value, 'ether');
  await web3.eth.sendTransaction({ from: accounts[0], to: '0x0C85940906A6c957476ce75752DBBbdf3b66fBc9', value });
  appendHistory(`Nạp ${document.getElementById("depositAmount").value} ETH`);
  getBalance();
}

async function withdrawETH() {
  const accounts = await web3.eth.getAccounts();
  const value = web3.utils.toWei(document.getElementById("withdrawAmount").value, 'ether');
  appendHistory(`Rút ${document.getElementById("withdrawAmount").value} ETH`);
  getBalance();
}

function appendHistory(msg) {
  const item = document.createElement("li");
  item.className = "list-group-item";
  item.innerText = `${new Date().toLocaleString()}: ${msg}`;
  document.getElementById("history").prepend(item);
}
