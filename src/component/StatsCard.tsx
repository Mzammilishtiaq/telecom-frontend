interface StatsCardProps {
    value: string
    label: string
  }
  
  export function StatsCard({ value, label }: StatsCardProps) {
    return (
      <div className="text-center">
        <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
          {value}
        </p>
        <p className="text-gray-600 font-medium">{label}</p>
      </div>
    )
  }
