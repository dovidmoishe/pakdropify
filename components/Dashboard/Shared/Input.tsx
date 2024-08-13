import { PlaceholdersAndVanishInput } from '@/components/ui/placeholders-and-vanish-input';
import React from 'react'

type Props = {
  className: string
}

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  console.log(e.target.value);
};
const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  console.log("submitted");
};

const placeholders = [
  "Enter Tracking ID",
  "Enter Recipient Name",
  "Enter Phone Number"
]
export default function SearchInput({className}: Props) {
  return (
    <div className={className}>
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />
    </div>
  )
}