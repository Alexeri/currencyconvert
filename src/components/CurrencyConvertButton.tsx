
import { Button } from "./ui/button"
import { FC } from 'react'

interface CurrencyConvertButtonProps {
  onClick: () => void;
}

const CurrencyConvertButton: FC<CurrencyConvertButtonProps> = ({ onClick}) => {
  return <Button onClick={onClick} size="lg" className="w-full mt-4 md:mt-0">Convert</Button>
}

export default CurrencyConvertButton