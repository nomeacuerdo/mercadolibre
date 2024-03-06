'use client'
import { useEffect } from 'react';
import Image from 'next/image';
import styles from './page.module.scss';
 
export default function Error({ error, reset }: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])
 
  return (
    <div className={styles.errorcontainer}>
      <div className={styles.picture}>
        <Image
          src='/error.svg'
          width={250}
          height={250}
          alt="Error!"
        />
      </div>
      <div className={styles.sidebar}>
        <h2 className={styles.title}>
          Hubo un error!
        </h2>
        <button type='button' className={styles.buy_button} onClick={() => reset()}>
          Reintentar
        </button>
      </div>
    </div>
  )
}