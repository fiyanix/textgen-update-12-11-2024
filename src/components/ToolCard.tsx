import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ToolCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  slug: string;
}

export default function ToolCard({ title, description, icon, slug }: ToolCardProps) {
  return (
    <Link 
      to={`/tools/${slug}`}
      target="_blank"
      className="group bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-indigo-100 rounded-lg text-indigo-600">
          {icon}
        </div>
        <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-indigo-600 transition-colors" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </Link>
  );
}