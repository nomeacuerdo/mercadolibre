'use client'

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import styles from './Navbar.module.scss';

const Navbar = () => {
  const [search, setSearch] = useState<string>('');
  const router = useRouter();

  const goHome = () => {
    setSearch('');
    router.push('/');
  };

  const searchTerm = () => {
    if (search !== '') {
      router.push(`/items?q=${encodeURI(search)}`);
    }
  };

  const keyboardHandler = (e: any) => {
    if (e.keyCode === 13) {
      searchTerm();
    }
  };

  return (
    <nav className={styles.navbar}>
      <div>
        <button type="button" className={styles.button} onClick={goHome}>
          <Image
            src="/logo.jpeg"
            width={53}
            height={36}
            alt="Mercadolibre"
          />
        </button>

        <div className={styles.searchbar}>
          <input
            className={styles.searchbox}
            type='text'
            placeholder='Nunca dejes de buscar'
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
            onKeyDown={keyboardHandler}
          />
          <button className={styles.searchbutton} type='submit' onClick={searchTerm}>
            <Image src="/search.png" alt="Buscar" height={18} width={18} />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
