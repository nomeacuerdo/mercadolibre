'use client'
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SearchResultType, ResultItemType } from '../../../types';
import { getItemsData } from '../../utils/api';
import Loading from '../../components/Loading';
import Breadcrumbs from '../../components/Breadcrumbs';
import ResultsCard from '../../components/ResultsCard';
import styles from './page.module.scss';

export default function Items() {
  const [breadcrumbsRoot, setBreadcrumbsRoot] = useState<string>('');
  const [search, setSearch] = useState<string | null>('');
  const [results, setResults] = useState<SearchResultType | null>(null);
  const params = useSearchParams();
  const query = params.get('q');

  const getBigCategory = (categoryArray: any[]) => categoryArray && categoryArray.length > 0
    ? categoryArray.reduce((prev: any, current: any) => {
        return (prev.instances > current.instances) ? prev : current;
      }, {})
    : {};
  
  useEffect(() => {
    if (search === '' && query !== '') {
      setSearch(query);
    }

    getItemsData(query)
      .then((data) => {
        setResults(data);
        const root = getBigCategory(data.categories);
        setBreadcrumbsRoot(root.category);
      });
  }, [query]);

  return (
    <Suspense fallback={<Loading />}>
      <Breadcrumbs category={breadcrumbsRoot} />
      <div className={styles.results}>
        {
          results && results.items.map((item: ResultItemType) => (
            <ResultsCard key={item.id} item={item} />
          ))
        }
      </div>
    </Suspense>
  );
};
