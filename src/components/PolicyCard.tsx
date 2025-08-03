import React from 'react';

interface PolicyCardProps {
  title: string;
  icon: React.ReactNode;
  description: React.ReactNode;
}

const PolicyCard = ({ title, icon, description }: PolicyCardProps) => {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-lg">
      <div className="mb-6 flex items-center">
        <div className="mr-4 flex size-12 items-center justify-center rounded-xl bg-green-100">
          {icon}
        </div>
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      </div>
      <div className="rounded-xl bg-gradient-to-r from-green-50 to-blue-50 p-6">
        <p className="text-lg leading-relaxed text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export { PolicyCard };
