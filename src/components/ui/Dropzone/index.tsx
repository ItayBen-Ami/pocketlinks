import { SyntheticEvent, useCallback, useState } from 'react';
import { FileRejection, useDropzone } from 'react-dropzone';
import { DROPZONE_STYLES_BY_STATUS, UploadStatus } from './styles';
import clsx from 'clsx';

export default function Dropzone({
  file,
  onImageDrop,
}: {
  file: File | undefined;
  onImageDrop: (file: File | null) => void;
}) {
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>('default');
  const [error, setError] = useState<string>('');
  const [preview, setPreview] = useState('');

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      if (rejectedFiles.length) {
        setUploadStatus('error');
        setError(rejectedFiles[0].errors[0].message);
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setPreview(URL.createObjectURL(acceptedFiles[0]));
      };
      reader.readAsDataURL(acceptedFiles[0]);

      onImageDrop(acceptedFiles[0]);
      setUploadStatus('success');
    },
    [onImageDrop],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/gif': ['.gif'],
      'image/webp': ['.webp'],
      'image/svg+xml': ['.svg'],
      'image/bmp': ['.bmp'],
      'image/tiff': ['.tif', '.tiff'],
    },
    maxFiles: 1,
    minSize: 1024,
    maxSize: 5 * 1024 * 1024,
  });

  const handleFileRemove = (e: SyntheticEvent) => {
    e.stopPropagation();
    onImageDrop(null);
    setUploadStatus('default');
  };

  return (
    <div
      {...getRootProps()}
      className={clsx(
        'border-dashed border-2 rounded-md px-3 py-3 flex flex-col items-center justify-center gap-2 cursor-pointer hover:opacity-70 active:opacity-50 h-44',
        DROPZONE_STYLES_BY_STATUS[uploadStatus].border,
      )}
    >
      {DROPZONE_STYLES_BY_STATUS[uploadStatus].icon}
      <input {...getInputProps()} />
      <div className="text-sm text-muted-foreground">
        {DROPZONE_STYLES_BY_STATUS[uploadStatus].content({
          uploadStatus,
          error,
          fileName: file?.name ?? '',
          fileSize: file?.size ?? 0,
          preview,
          onRemove: handleFileRemove,
          isDragActive,
        })}
      </div>
    </div>
  );
}
