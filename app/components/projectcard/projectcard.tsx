interface ProjectCardProps {
  title: string;
  description?: string;
  link?: string;
  screenshot?: string;
}

export default function ProjectCard({
  title,
  description,
  link,
  screenshot,
}: ProjectCardProps) {
  return (
    <div className="bg-white p-6 shadow">
      {screenshot && (
        <img
          src={screenshot}
          alt={title}
          className="w-full h-40 object-cover rounded-md mb-4"
        />
      )}
      <h3 className="text-xl font-bold">{title}</h3>
      {description && <p className="mt-2 text-gray-700">{description}</p>}
      {link && (
        <a href={link} className="text-blue-500 hover:underline mt-4 block">
          Link
        </a>
      )}
    </div>
  );
}
