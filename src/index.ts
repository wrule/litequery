import 'global-agent/bootstrap';
import { ethers } from 'ethers';

async function main() {
  const a = new ethers.JsonRpcProvider('https://mainnet.infura.io/v3/89d62adb179b4b7a8f028347dd5a1cc5');
  const b = await a.getBalance('0x28dF8c4d5fc59cA685546e817772181Fb717E503');
  console.log(ethers.formatEther(b));
}

main();
