export const SkeletonLoader = () => (
  <div className="animate-pulse">
    {/* Image View Skeleton */}
    <div className="flex flex-wrap gap-6 items-stretch mb-10">
      <div className="w-full lg:w-[calc(50%-12px)] h-[400px] bg-gray-200 rounded-[8px]"></div>
      <div className="flex flex-col gap-5 w-full lg:w-[calc(50%-12px)]">
        <div className="w-full h-[calc(50%-10px)] bg-gray-200 rounded-[8px]"></div>
        <div className="w-full h-[calc(50%-10px)] bg-gray-200 rounded-[8px]"></div>
      </div>
    </div>

    {/* Details View Skeleton */}
    <div className="border p-4 rounded-[8px]">
      <div className="flex gap-4 mb-4">
        <div className="w-24 h-8 bg-gray-200 rounded-full"></div>
        <div className="w-24 h-8 bg-gray-200 rounded-full"></div>
      </div>
      <div className="h-[300px] bg-gray-200 rounded-[8px]"></div>
    </div>
  </div>
);

export const SidebarSkeletonLoader = () => (
  <div className="animate-pulse border p-4 rounded-[8px] flex flex-col gap-10">
    <div>
      <div className="w-20 h-6 bg-gray-200 mb-2"></div>
      <div className="w-32 h-8 bg-gray-200 rounded-full"></div>
    </div>
    <div>
      <div className="w-40 h-6 bg-gray-200 mb-2"></div>
      <div className="w-full h-20 bg-gray-200 rounded-[8px]"></div>
    </div>
    <div>
      <div className="w-48 h-6 bg-gray-200 mb-2"></div>
      <div className="w-full h-12 bg-gray-200 rounded-[8px]"></div>
    </div>
    <div>
      <div className="w-56 h-6 bg-gray-200 mb-2"></div>
      <div className="w-full h-16 bg-gray-200 rounded-[8px]"></div>
    </div>
  </div>
);
