
import { Button } from "./ui/button"
import { FC } from 'react'

interface CurrencyHistoryButtonProps {
  onClick: () => void;
}

const CurrencyHistoryButton: FC<CurrencyHistoryButtonProps> = ({ onClick}) => {
  return <Button onClick={onClick} size="lg" variant="outline">Get History</Button>
}

export default CurrencyHistoryButton