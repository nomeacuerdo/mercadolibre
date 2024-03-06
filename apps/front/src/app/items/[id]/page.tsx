import { Suspense } from 'react';
import Image from 'next/image';
import { Metadata, ResolvingMetadata } from 'next';
import { ConditionType } from '../../../../types';
import { getItemDetails } from '../../../utils/api';
import { formatPrice } from '../../../utils/price';
import Loading from '../../../components/Loading';
import Breadcrumbs from '../../../components/Breadcrumbs';
import styles from './page.module.scss';

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

const conditions: ConditionType = {
  new: 'Nuevo',
  used: 'Usado',
  not_specified: 'No especificado',
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = params;
  const data = await getItemDetails(id);
 
  return {
    title: data.item.title,
    description: data.item.description,
    metadataBase: new URL('htps://nomeacuerdo.co'),
    openGraph: {
      images: [data.item.picture],
    },
  }
}

export default async function ItemDetails({ params }: { params: { id: string } }) {
  const { id } = params;
  const data = await getItemDetails(id);

  const formattedPrice = data && formatPrice(data.item.price, 2);

  return data && (
    <Suspense fallback={<Loading />}>
      <Breadcrumbs category={data.item.category_id} />
      <div className={styles.product}>
        <div className={styles.picture}>
          <img
            src={data.item.picture}
            width="auto"
            height="auto"
            alt={data.item.title}
          />
        </div>
        <div className={styles.sidebar}>
          <div className={styles.attributes}>
            {conditions[data.item.condition as keyof typeof conditions]}
            {data.item.sold_quantity > 0 ? ` - ${data.item.sold_quantity} vendidos` : null}
          </div>
          <h2 className={styles.title}>
            {data.item.title}
          </h2>
          <div className={styles.price_container}>
            <h3 className={styles.price}>
              {formattedPrice?.price}
              <sup>{formattedPrice?.decimals}</sup>
            </h3>
            {data.item.free_shipping && (
              <Image
                src='/free_shipping.png'
                width={18}
                height={18}
                alt="Envío Gratis!"
              />
            )}
          </div>
          <button type='button' className={styles.buy_button}>
              Comprar
          </button>
        </div>
        <div className={styles.description}>
          <h4>Descripción del producto</h4>
          <div
            dangerouslySetInnerHTML={{ __html: data.item.description.replace(/\n/g, "<br />") }}
          />
        </div>
      </div>
    </Suspense>
  );
};
