export const LoadingSpinner = ({ size = "md" }: { size?: "sm" | "md" | "lg" }) => {
  const sizes = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-2",
    lg: "h-12 w-12 border-4",
  }

  return <div className={`animate-spin rounded-full ${sizes[size]} border-indigo-600 border-t-transparent`} />
}

export const LoadingOverlay = ({ message = "Loading..." }: { message?: string }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-xl shadow-2xl flex flex-col items-center space-y-4">
        <LoadingSpinner size="lg" />
        <p className="text-slate-600 font-medium">{message}</p>
      </div>
    </div>
  )
}
