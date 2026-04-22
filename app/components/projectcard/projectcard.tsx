interface ProjectCardProps {
  title: string;
  description?: string;
  link?: string;
  link2?: string;
  screenshot?: string;
  className: string;
}

export default function ProjectCard({
  title,
  description,
  link,
  link2,
  screenshot,
  className,
}: ProjectCardProps) {
  return (
    <div className={`bg-white p-6 shadow ${className}`}>
      {screenshot && (
        <img
          src={screenshot}
          alt={title}
          className="w-full h-40 object-cover rounded-md mb-4"
        />
      )}
      <h3 className="text-xl font-bold">{title}</h3>
      {description && <p className="mt-2 text-gray-700">{description}</p>}
      <div className="flex gap-4 mt-4">
        {link && (
          <a href={link} className="text-blue-700 hover:underline font-bold">
            Deployed
          </a>
        )}
        {link2 && (
          <a href={link2} className="text-blue-700 hover:underline font-bold">
            GitHub
          </a>
        )}
      </div>
    </div>
  );
}
