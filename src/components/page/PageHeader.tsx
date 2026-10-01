interface PageHeaderProps {
  title: string;
  description?: string;  //acıklama istege baglı
}

function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <header className="flex flex-col gap-1">
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h1>

      {description && (              //yalnızca acıklama gönderilirse <p> olusturur
        <p className="max-w-2xl text-sm text-muted-foreground">{description}</p>
      )}
    </header>
  );
}

export default PageHeader;
