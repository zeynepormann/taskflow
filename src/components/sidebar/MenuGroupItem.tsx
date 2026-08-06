
interface MenuGroupItemProps{
    title: string;
}

function MenuGroupItem({
    title,
}: MenuGroupItemProps){
    return(
        <p className="mt-4 font-sans font-semibold">
            {title}
        </p>
    );
}
export default MenuGroupItem