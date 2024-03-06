import Link from 'next/link';
import Image from 'next/image';
import { ResultItemType } from '../../types';
import { formatPrice } from '../utils/price';
import styles from './ResultsCard.module.scss';

const ResultsCard = ({ item }: { item: ResultItemType }) => {
  const {
    id,
    title,
    price,
    picture,
    freeShipping,
    seller
  } = item;

  const formattedPrice = formatPrice(price, 0);

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <Link href={`/items/${id}`} className={styles.link}>
          <img
            src={picture}
            width={180}
            height={180}
            alt={title}
            className={styles.picture}
          />
        </Link>
        <div className={styles.description}>
          <Link href={`/items/${id}`} className={styles.link}>
            <span className={styles.price}>
              {formattedPrice.price}
              {
                freeShipping && (
                  <Image
                    src='/free_shipping.png'
                    width={18}
                    height={18}
                    alt="Envío Gratis!"
                  />
                )
              }
            </span>
            <span className={styles.title}>
              {title}
            </span>
          </Link>
        </div>
      </div>
      <div className={styles.location}>
        {seller}
      </div>
    </div>
  );
};

export default ResultsCard;
