// components/Loading.js
import { Loader } from "lucide-react";

export default function LoadingSkeleton() {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <Loader className="animate-spin text-yellow-500 h-8 w-8" />
      </div>
    );
  }
  