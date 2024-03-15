import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const apiKey = process.env.ALPHA_VANTAGE_API_KEY;

    const from = req.nextUrl.searchParams.get("from")?.toUpperCase() || "";
    const to = req.nextUrl.searchParams.get("to")?.toUpperCase() || "";

    const response = await axios.get(
      `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${from}&to_currency=${to}&apikey=${apiKey}`
    );

    const fromCurrency = Object.values(response.data).map(
      (data: any) => data["1. From_Currency Code"]
    );
    const fromCurrencyName = Object.values(response.data).map(
      (data: any) => data["2. From_Currency Name"]
    );

    const toCurrency = Object.values(response.data).map(
      (data: any) => data["3. To_Currency Code"]
    );
    const toCurrencyName = Object.values(response.data).map(
      (data: any) => data["4. To_Currency Name"]
    );

    const exchangeValue = Object.values(response.data).map((data: any) =>
      parseFloat(data["5. Exchange Rate"])
    );

    const exchangeData = {
      fromCurrency: fromCurrency,
      fromCurrencyName: fromCurrencyName,
      toCurrency: toCurrency,
      toCurrencyName: toCurrencyName,
      exchangeValue: exchangeValue,
    };

    return NextResponse.json({ exchangeData }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
