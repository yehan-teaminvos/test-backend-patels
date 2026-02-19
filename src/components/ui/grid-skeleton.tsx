export default function GridSkeleton() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="space-y-4">
          <div className="aspect-4/5 bg-gray-100 rounded-xl" />
          <div className="h-4 bg-gray-100 rounded w-3/4" />
          <div className="h-4 bg-gray-100 rounded w-1/2" />
        </div>
      ))}
    </div>
  );
}
