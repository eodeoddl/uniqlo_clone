'use client';

interface ButtonProps {
  downloadUrl: string;
  filename: string;
  children?: React.ReactNode;
  className?: string;
}

export default function DownloadButton(props: ButtonProps) {
  const { downloadUrl, filename, children, className } = props;
  const onClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    const image = await fetch(downloadUrl);
    const blob = await image.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    window.URL.revokeObjectURL(url);
  };
  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  );
}
