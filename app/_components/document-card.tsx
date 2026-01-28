import Image from "next/image";
import Link from "next/link";

interface DocumentCardProps {
  id: string;
  title: string;
  imageUrl: string;
  description?: string | null;
  onClick?: (id: string) => void;
}

export const DocumentCard = ({
  id,
  title,
  imageUrl,
  description,
  onClick,
}: DocumentCardProps) => {

  const CardInner = (
    <div className="group cursor-pointer bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-500 h-full flex flex-col p-4">
        {/* Image Container */}
        <div className="relative w-full aspect-[3/2] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
          <Image
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            alt={title}
            src={imageUrl || "/tally-book.png"}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={false}
          />
          {/* Overlay on Hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
        </div>

        {/* Content Container */}
        <div className="flex-1 flex flex-col mt-2">
          {/* Title */}
          <h3 className="font-bold text-gray-900 group-hover:text-[#F41828] transition-colors duration-200 leading-tight line-clamp-2 text-lg">
            {title}
          </h3>

          {/* Description */}
          {description && (
            <p className="text-gray-600 text-sm leading-relaxed mb-2 line-clamp-2 flex-1">
              {description}
            </p>
          )}

          {/* Action */}
          <div className="flex items-center justify-between mt-auto pt-2 border-gray-100">

            {/* View Details Button */}
            <div className="opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-500 text-[#F41828] font-semibold text-sm flex items-center gap-1">
              View Details
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={() => onClick(id)}
        className="text-left"
      >
        {CardInner}
      </button>
    );
  }

  return (
    <Link href={`/${id}`}>
      {CardInner}
    </Link>
  );
};