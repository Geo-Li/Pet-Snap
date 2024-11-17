import Image from "next/image";

type FocusedImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
};

const FocusedImage: React.FC<FocusedImageProps> = ({
  src,
  alt,
  width,
  height,
  className,
}) => {
  return (
    <div className="relative inline-block">
      <div className={className}>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={`object-cover`}
        />
      </div>
    </div>
  );
};

export default FocusedImage;
