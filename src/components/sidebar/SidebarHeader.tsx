
interface SidebarHeaderProps {
    title: string;
    description: string;
}

function SidebarHeader({
    title,
    description,
}: SidebarHeaderProps){
    return (
      <div className="flex flex-col min-w-0">
        <p className="text-xl font-bold">
            {title}
        </p>

        <p className="text-xs font-semibold">
            {description}
        </p>
      </div>
    );
}
export default SidebarHeader