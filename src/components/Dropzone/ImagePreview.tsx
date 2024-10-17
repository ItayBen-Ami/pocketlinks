import { CircleX } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { formatBytes } from '../../utils/formatBytes';
type PreviewImageProps = {
  preview: string;
  fileSize: number;
  fileName: string;
  onRemove: () => void;
};

export function PreviewImage({ preview, fileSize, fileName, onRemove }: PreviewImageProps) {
  return (
    <div className="relative group size-40">
      <img className="rounded-3xl group-hover:blur-sm size-36 object-cover transition duration-300" src={preview} />
      <div
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 
      opacity-70 hover:opacity-100"
        onClick={onRemove}
      >
        <CircleX />
      </div>
      <div className="absolute inset-0 flex items-center justify-evenly flex-col">
        <div
          className="transform -translate-y-10 opacity-0 transition-all 
        duration-300 group-hover:translate-y-0 group-hover:opacity-80
        "
        >
          <Badge variant="secondary">{fileName}</Badge>
        </div>
        <div
          className="transform translate-y-10 opacity-0 transition-all 
        duration-300 group-hover:translate-y-0 group-hover:opacity-80
        "
        >
          <Badge variant="secondary">{formatBytes(fileSize)}</Badge>
        </div>
      </div>
    </div>
  );
}
