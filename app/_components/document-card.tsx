import Link from "next/link";

interface DocumentCardProps {
  id: string;
  title: string;
  onClick?: (id: string) => void;
}

export const DocumentCard = ({
  id,
  title,
  onClick,
}: DocumentCardProps) => {

  const CardInner = (
    <div className="group cursor-pointer bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-500 h-10 flex flex-col p-2">
        {/* Content Container */}
        <div className="flex-1 flex flex-col mt-2">
          {/* Title */}
          <h3 className="font-bold text-gray-900 group-hover:text-[#F41828] transition-colors duration-200 leading-tight line-clamp-2 text-lg">
            {title}
          </h3>
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