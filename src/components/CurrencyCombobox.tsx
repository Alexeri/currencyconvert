"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CommandList } from "cmdk";

import currencies from "@/JSON/currencies.json";
import { FC } from "react";

interface CurrencyComboboxProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const CurrencyCombobox: FC<CurrencyComboboxProps> = ({
  open,
  setOpen,
  value,
  setValue,
}) => {
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between h-12"
        >
          {value
            ? currencies.find((framework) => framework.code === value)?.name
            : "Select currency..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="min-w-[345px] p-0 ">
        <Command>
          <CommandInput placeholder="Search currency..." />
          <div className="max-h-72 overflow-auto">
            <CommandList className="">
              <CommandEmpty>No currency found.</CommandEmpty>

              <CommandGroup>
                {currencies.map((framework) => (
                  <CommandItem
                    key={framework.code}
                    value={framework.code}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === framework.code ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <p className="font-medium mr-2">{framework.code} - </p>
                    <p className="">{framework.name}</p>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </div>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default CurrencyCombobox;
