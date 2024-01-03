import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/ui/card';
import React from 'react';
import { DollarSign, CreditCard, Package } from 'lucide-react'; // Replace with your actual icon components

interface StatcardProps {
  icon: 'dollar' | 'creditCard' | 'package';
  title: string;
  amount: string | number;

}
const StatCard: React.FC<StatcardProps> = ({ icon, title, amount }) => {
  const iconMap: Record<string, React.ReactNode> = {
    dollar: <DollarSign className="h-8 w-8 text-black" />,
    creditCard: <CreditCard className="h-8 w-8 text-black" />,
    package: <Package className="h-8 w-8 text-black" />,
  };

  return (
    <Card className='bg-slate-200 dark:bg-amber-200 text-black'>
      <CardHeader className="flex flex-row items-center  justify-between space-y-0 pb-2 p-5 min-h-[80px]">
        <CardTitle className="textxl font-medium ">{title}</CardTitle>
        {iconMap[icon]}
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-extrabold">{amount}</div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
