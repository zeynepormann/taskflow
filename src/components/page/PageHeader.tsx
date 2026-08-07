interface PageHeaderProps {
  title: string;
  description?: string;  //acıklama istege baglı
}

function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <header>
      <h1 className="text-2xl font-bold">{title}</h1>

      {description && (              //yalnızca acıklama gönderilirse <p> olusturur
        <p className="text-xs font-semibold">{description}</p>
      )}
    </header>
  );
}

export default PageHeader;
