"use client";
import { FC, useState, useEffect } from "react";
import CurrencyConvertButton from "./CurrencyConvertButton";
import * as React from "react";

import { Input } from "./ui/input";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";

import { Label } from "./ui/label";

import { DatePickerWithRange } from "./DateRange";
import CurrencyCombobox from "./CurrencyCombobox";
import CurrencyHistoryButton from "./CurrencyHistoryButton";

import useSWR from "swr";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface MainComponentsProps {}

const MainComponents: FC<MainComponentsProps> = ({}) => {
  const [amount, setAmount] = useState<number>(1);
  const [date, setDate] = React.useState<any | undefined>({
    from: new Date(2024, 2, 8),
    to: addDays(new Date(2024, 2, 8), 7),
  });

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    const numericValue = parseFloat(newValue);
    if (!isNaN(numericValue)) {
      setAmount(numericValue);
    }
  };

  async function fetchData() {
   

    try {
      const response = await fetch(
        `/api/currency?from=${fromValue}&to=${toValue}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }
      const test = await response.json();
      return test["exchangeData"];
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  async function fetchHistory2() {
    try {
      const response = await fetch(
        `/api/currency/history?from=${fromValue}&to=${toValue}&start=${formattedDateStart}&end=${formattedDateEnd}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }
      const test = await response.json();
      return test["exchangeData"];
    } catch (error) {
      console.error("Error fetching data:", error);
      throw new Error("Failed to fetch data");
    }
  }

  const [openFrom, setOpenFrom] = React.useState<boolean>(false);
  const [openTo, setOpenTo] = React.useState<boolean>(false);
  const [fromValue, setFromValue] = React.useState<string>("EUR");
  const [toValue, setToValue] = React.useState<string>("USD");
  const [isFetchingConvert, setIsFetchingConvert] =
    React.useState<boolean>(false);
  const [isFetchingHistory, setIsFetchingHistory] =
    React.useState<boolean>(false);
 
  const formattedDateStart = format(date?.from, "yyyy-MM-dd");
  const formattedDateEnd = format(date?.to, "yyyy-MM-dd");
  const convertResult = useSWR(
    isFetchingConvert ? `/api/currency?from=${fromValue}&to=${toValue}` : null,
    fetchData
  );
  const historyResult = useSWR(
    isFetchingHistory
      ? `/api/currency/history?from=${fromValue}&to=${toValue}&start=${formattedDateStart}&end=${formattedDateEnd}`
      : null,
    fetchHistory2
  );

  const convertClick = async () => {
    setIsFetchingConvert(true);
  };

  const historyClick = async () => {
    setIsFetchingHistory(true);
  };

  return (
    <div className="bg-background p-6 rounded-lg shadow-lg mb-20">
      <div className="grid md:grid-cols-3 gap-4">
        <div className="flex flex-col">
          <Label className="mb-1 text-lg">Amount</Label>
          <Input
            type="number"
            value={amount}
            onChange={handleAmountChange}
            className="h-12"
          ></Input>
        </div>
        <div className="flex flex-col">
          <Label className="mb-1 text-lg">From</Label>

          <CurrencyCombobox
            open={openFrom}
            setOpen={setOpenFrom}
            value={fromValue}
            setValue={setFromValue}
          />
        </div>
        <div className="flex flex-col">
          <Label className="mb-1 text-lg">To</Label>
          <CurrencyCombobox
            open={openTo}
            setOpen={setOpenTo}
            value={toValue}
            setValue={setToValue}
          />
        </div>
      </div>
      <div className="flex my-6">
        {convertResult.data && (
          <>
            <div>
              <p className="text-xl">
                {amount} {convertResult.data["fromCurrencyName"]} =
              </p>
              <p className="text-3xl font-medium my-2">
                {" "}
                {(amount * Number(convertResult.data["exchangeValue"])).toFixed(
                  6
                )}{" "}
                {convertResult.data["toCurrencyName"]}
              </p>
              {amount !== 1 ? (
                <p>
                  1 {convertResult.data["fromCurrencyName"]} ={" "}
                  {convertResult.data["exchangeValue"]}{" "}
                  {convertResult.data["toCurrencyName"]}
                </p>
              ) : (
                <p></p>
              )}
            </div>
          </>
        )}
        {convertResult.isLoading && <div>Loading conversion...</div>}
      </div>
      <div className="flex flex-col md:flex-row justify-between">
        {convertResult.data ? (
          <div className="flex justify-between md:justify-normal">
            <div className="mr-2">
            <CurrencyHistoryButton onClick={historyClick} />
            </div>
            <DatePickerWithRange date={date} setDate={setDate} />
          </div>
        ) : (
          <div></div>
        )}
        <div>
          <CurrencyConvertButton onClick={convertClick}></CurrencyConvertButton>
        </div>
      </div>
      <div className="mt-3">
        {historyResult.data && (
          <Table>
            <TableCaption>
              Missing dates means no data for that select day.
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="">Date</TableHead>
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead>Rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.keys(historyResult.data["filteredData"]).map((key) => (
                <TableRow key={key}>
                  <TableCell>{key}</TableCell>
                  <TableCell>{historyResult.data["from"]}</TableCell>
                  <TableCell>{historyResult.data["to"]}</TableCell>
                  <TableCell>{`${historyResult.data["filteredData"][key]["4. close"]}`}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        {historyResult.isLoading && <div>Loading history...</div>}
        {historyResult.error && <div>{historyResult.error}error</div>}
      </div>
    </div>
  );
};

export default MainComponents;
