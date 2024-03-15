import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const apiKey = process.env.ALPHA_VANTAGE_API_KEY;

    const from = req.nextUrl.searchParams.get("from")?.toUpperCase() || "";
    const to = req.nextUrl.searchParams.get("to")?.toUpperCase() || "";
    const start = req.nextUrl.searchParams.get("start")?.toUpperCase() || "";
    const end = req.nextUrl.searchParams.get("end")?.toUpperCase() || "";

    const response = await axios.get(
      `https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=${from}&to_symbol=${to}&apikey=${apiKey}`
    );
    const filteredData = Object.entries(response.data["Time Series FX (Daily)"])
      .filter(([date]) => date >= start && date <= end)
      .reduce((acc: any, [date, value]) => {
        acc[date] = value;
        return acc;
      }, {});

    const exchangeData = {
      filteredData,
      from,
      to,
    };

    return NextResponse.json({ exchangeData }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
