import { CircleX, ImageUp, CircleCheck } from 'lucide-react';
import { ReactElement } from 'react';
import { PreviewImage } from './ImagePreview';

export type UploadStatus = 'default' | 'success' | 'error';

type DropzoneContentProps = {
  error: string;
  isDragActive: boolean;
  fileName: string;
  fileSize: number;
  uploadStatus: UploadStatus;
  onRemove: () => void;
  preview: string;
};

export const DROPZONE_STYLES_BY_STATUS: Record<
  UploadStatus,
  { icon: ReactElement; border: string; content: (props: DropzoneContentProps) => JSX.Element }
> = {
  default: {
    icon: <ImageUp className="size-10" />,
    border: '',
    content: ({ isDragActive }) =>
      isDragActive ? (
        <p>Drop your image here</p>
      ) : (
        <div className="flex flex-col items-center ">
          <span>Click here or drag a file to set a custom image</span>
          <span>For private sites, uploading is recommended</span>
        </div>
      ),
  },
  success: {
    icon: <CircleCheck className="size-10 text-green-400" />,
    border: 'border-green-400',
    content: ({ preview, fileName, fileSize, onRemove }) => (
      <PreviewImage preview={preview} fileName={fileName} fileSize={fileSize} onRemove={onRemove} />
    ),
  },
  error: {
    icon: <CircleX className="size-10 text-red-300" />,
    border: 'border-red-300',
    content: ({ fileName, error }) => (
      <div>
        Failed uploading {fileName}, with errors: {error}
      </div>
    ),
  },
};
