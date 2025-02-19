import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react'

const SectionHeading = ({
  sectionTitle,
  dLink,
  dLinkTitle,
}: {
  sectionTitle: string;
  dLink: string;
  dLinkTitle:string;
}) => {
  return (
    <div className="flex justify-between items-center mb-6 md:mb-8">
      <h2 className="text-xl font-bold md:text-3xl">{sectionTitle}</h2>
      <Link href={dLink}>
        <Button variant="outline">{dLinkTitle}</Button>
      </Link>
    </div>
  );
};

export default SectionHeading
