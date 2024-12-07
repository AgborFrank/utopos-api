export default async function handler(req, res) {
  const apiKey = "1MTAKD8PPDHUYWKHJMB3K9PD8F8SYU5KV9";
  const tokenAddress = "0x2E6819782bEdE1fBfaDa433906253A90CA06157a";

  const totalSupplyEndpoint = `https://api.polygonscan.com/api?module=stats&action=tokensupply&contractaddress=${tokenAddress}&apikey=${apiKey}`;

  try {
    const response = await fetch(totalSupplyEndpoint);
    const data = await response.json();

    if (data.status === "1" && data.message === "OK") {
      const totalSupply = BigInt(data.result); // Handle large integers
      const formattedSupply = (totalSupply / BigInt(10 ** 18)).toString(); // Adjust for 18 decimals and remove commas
      res.status(200).json({ totalSupply: formattedSupply }); // Send JSON response
    } else {
      res.status(500).json({ error: "Failed to fetch total supply" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching total supply" });
  }
}
