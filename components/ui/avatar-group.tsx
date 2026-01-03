import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AvatarGroupProps {
  totalParticipants: number;
  year?: number;
}

export default function AvatarGroup({
  totalParticipants,
  year = 2020,
}: AvatarGroupProps) {
  // Gaming-themed avatar images from Unsplash
  const avatars = [
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=100&h=100&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=faces",
  ];

  return (
    <div className="flex items-center gap-4 justify-center">
      {/* Stacked Avatars */}
      <div className="flex -space-x-3">
        {avatars.map((src, index) => (
          <Avatar
            key={index}
            className="border-2 border-gray-950 w-10 h-10 hover:scale-110 transition-transform duration-200 hover:z-10"
          >
            <AvatarImage src={src} alt={`Participant ${index + 1}`} />
            <AvatarFallback>P{index + 1}</AvatarFallback>
          </Avatar>
        ))}
      </div>

      {/* Participant Count */}
      <p className="text-sm text-gray-400">
        <span className="font-bold text-white">
          +{totalParticipants.toLocaleString()}
        </span>{" "}
        participants depuis {year}
      </p>
    </div>
  );
}
