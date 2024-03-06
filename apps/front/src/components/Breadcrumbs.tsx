'use client'
import { useEffect, useState } from 'react';
import { getCategoryData } from '../utils/api';
import styles from './Breadcrumbs.module.scss';

const Breadcrumbs = ({ category }: { category: string }) => {
  const [breadcrumbs, setBreadcrumbs] = useState<string[]>([]);

  useEffect(() => {
    if (category) {
      getCategoryData(category)
        .then((data: any) => {
          const categoryTree = data.path_from_root.map((item: any) => item.name);
          setBreadcrumbs(categoryTree);
        });
    }
  }, [category]);

  return (
    <ul className={styles.container}>
      {
        breadcrumbs.map((item: string) => (
          <li key={item} className={styles.element}>
            {item}
          </li>
        ))
      }
    </ul>
  );
};

export default Breadcrumbs;
