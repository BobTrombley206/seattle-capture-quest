import { Link } from "react-router-dom";
import BreadcrumbSchema from "./schemas/BreadcrumbSchema";

interface BreadcrumbItem {
  name: string;
  path: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <>
      <BreadcrumbSchema items={items} />
      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-4">
        <ol className="flex items-center gap-1.5" itemScope itemType="https://schema.org/BreadcrumbList">
          {items.map((item, index) => (
            <li
              key={item.path}
              className="flex items-center gap-1.5"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              {index > 0 && <span aria-hidden="true">/</span>}
              {index < items.length - 1 ? (
                <Link to={item.path} itemProp="item" className="hover:text-foreground transition-colors">
                  <span itemProp="name">{item.name}</span>
                </Link>
              ) : (
                <span itemProp="name" aria-current="page">{item.name}</span>
              )}
              <meta itemProp="position" content={String(index + 1)} />
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
};

export default Breadcrumbs;
