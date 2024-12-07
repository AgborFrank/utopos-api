export default async function handler(req, res) {
    const apiKey = "1MTAKD8PPDHUYWKHJMB3K9PD8F8SYU5KV9";
    const tokenAddress = "0x2E6819782bEdE1fBfaDa433906253A90CA06157a";
  
    const totalSupplyEndpoint = `https://api.polygonscan.com/api?module=stats&action=tokensupply&contractaddress=${tokenAddress}&apikey=${apiKey}`;
  
    try {
      const response = await fetch(totalSupplyEndpoint);
      const data = await response.json();
  
      if (data.status === "1" && data.message === "OK") {
        const totalSupply = BigInt(data.result); // Handle large integers
        const adjustedSupply = (totalSupply / BigInt(10 ** 18)).toString(); // Adjust for 18 decimals
        res.status(200).send(adjustedSupply); // Respond as plain text
      } else {
        res.status(200).send("NA"); // Return "NA" if fetch fails
      }
    } catch (error) {
      res.status(200).send("NA"); // Return "NA" on error
    }
  }
  